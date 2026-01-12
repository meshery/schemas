/**
 * csv.js - Shared CSV Utilities for Build Scripts
 *
 * Provides utilities for parsing CSV files and downloading from Google Sheets.
 * Supports both local CSV files and remote Google Sheets as data sources.
 */

const fs = require("fs");
const https = require("https");
const http = require("http");
const { parse } = require("csv-parse/sync");
const logger = require("./logger");

/**
 * Parse CSV content into an array of row arrays
 * @param {string} content - CSV content string
 * @param {Object} [options] - Parse options
 * @param {number} [options.skipRows=0] - Number of header rows to skip
 * @returns {string[][]} Array of parsed rows
 */
function parseCSV(content, options = {}) {
  const { skipRows = 0 } = options;

  const records = parse(content, {
    skip_empty_lines: true,
    relax_column_count: true,
    trim: true,
  });

  return records.slice(skipRows);
}

/**
 * Extract Google Sheet ID from various URL formats
 * @param {string} url - Google Sheets URL
 * @returns {string|null} Sheet ID or null if not a valid Google Sheets URL
 */
function extractGoogleSheetId(url) {
  const match = url.match(
    /docs\.google\.com\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/,
  );
  return match ? match[1] : null;
}

/**
 * Extract GID (sheet tab ID) from URL if present
 * @param {string} url - Google Sheets URL
 * @returns {string|null} GID or null if not present
 */
function extractGoogleSheetGid(url) {
  const match = url.match(/[?&]gid=(\d+)/);
  return match ? match[1] : null;
}

/**
 * Build Google Sheets CSV export URL
 * @param {string} sheetId - Google Sheet ID
 * @param {string|null} [gid] - Optional sheet tab GID
 * @returns {string} CSV export URL
 */
function buildGoogleSheetsCsvUrl(sheetId, gid = null) {
  let url = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv`;
  if (gid) {
    url += `&gid=${gid}`;
  }
  return url;
}

/**
 * Check if a string is a URL
 * @param {string} str - String to check
 * @returns {boolean} True if string is a URL
 */
function isUrl(str) {
  return str.startsWith("http://") || str.startsWith("https://");
}

/**
 * Check if a string is a Google Sheets URL
 * @param {string} str - String to check
 * @returns {boolean} True if string is a Google Sheets URL
 */
function isGoogleSheetsUrl(str) {
  return str.includes("docs.google.com/spreadsheets");
}

/**
 * Download content from a URL
 * @param {string} url - URL to download from
 * @param {Object} [options] - Download options
 * @param {number} [options.maxRedirects=5] - Maximum number of redirects to follow
 * @param {number} [options.timeout=30000] - Request timeout in milliseconds
 * @returns {Promise<string>} Downloaded content
 */
function downloadUrl(url, options = {}) {
  const { maxRedirects = 5, timeout = 30000 } = options;

  return new Promise((resolve, reject) => {
    const protocol = url.startsWith("https://") ? https : http;

    const request = protocol.get(url, { timeout }, (response) => {
      // Handle redirects
      if (
        response.statusCode >= 300 &&
        response.statusCode < 400 &&
        response.headers.location
      ) {
        if (maxRedirects <= 0) {
          reject(new Error("Too many redirects"));
          return;
        }

        let redirectUrl = response.headers.location;
        if (!redirectUrl.startsWith("http")) {
          const urlObj = new URL(url);
          redirectUrl = `${urlObj.protocol}//${urlObj.host}${redirectUrl}`;
        }

        downloadUrl(redirectUrl, { ...options, maxRedirects: maxRedirects - 1 })
          .then(resolve)
          .catch(reject);
        return;
      }

      if (response.statusCode !== 200) {
        reject(
          new Error(`HTTP ${response.statusCode}: Failed to download ${url}`),
        );
        return;
      }

      let data = "";
      response.setEncoding("utf8");
      response.on("data", (chunk) => {
        data += chunk;
      });
      response.on("end", () => {
        resolve(data);
      });
      response.on("error", reject);
    });

    request.on("error", reject);
    request.on("timeout", () => {
      request.destroy();
      reject(new Error(`Request timeout: ${url}`));
    });
  });
}

/**
 * Download CSV from Google Sheets
 * @param {string} urlOrId - Google Sheets URL or Sheet ID
 * @param {Object} [options] - Download options
 * @param {string} [options.gid] - Optional sheet tab GID (overrides URL gid)
 * @returns {Promise<string>} CSV content
 */
async function downloadGoogleSheet(urlOrId, options = {}) {
  let sheetId;
  let gid = options.gid || null;

  if (isUrl(urlOrId)) {
    sheetId = extractGoogleSheetId(urlOrId);
    if (!sheetId) {
      throw new Error(`Invalid Google Sheets URL: ${urlOrId}`);
    }
    if (!gid) {
      gid = extractGoogleSheetGid(urlOrId);
    }
  } else {
    sheetId = urlOrId;
  }

  const csvUrl = buildGoogleSheetsCsvUrl(sheetId, gid);
  logger.step(
    `Downloading from Google Sheets: ${sheetId}${gid ? ` (gid=${gid})` : ""}`,
  );

  return downloadUrl(csvUrl);
}

/**
 * Load CSV content from either a local file or remote source
 * Automatically detects Google Sheets URLs and handles them appropriately
 *
 * @param {string} source - Local file path, URL, or Google Sheets URL
 * @param {Object} [options] - Load options
 * @param {string} [options.gid] - Optional Google Sheets tab GID
 * @returns {Promise<string>} CSV content
 */
async function loadCSV(source, options = {}) {
  if (isGoogleSheetsUrl(source)) {
    return downloadGoogleSheet(source, options);
  }

  if (isUrl(source)) {
    logger.step(`Downloading CSV from: ${source}`);
    return downloadUrl(source);
  }

  // Local file
  logger.step(`Reading CSV from: ${source}`);
  if (!fs.existsSync(source)) {
    throw new Error(`CSV file not found: ${source}`);
  }
  return fs.readFileSync(source, "utf-8");
}

/**
 * Convert a string to PascalCase
 * @param {string} str - String to convert
 * @returns {string} PascalCase string
 */
function toPascalCase(str) {
  if (!str) return "";

  return str
    .trim()
    .replace(/[^a-zA-Z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .map((word) => {
      if (!word) return "";
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join("");
}

/**
 * Validate UUID format
 * @param {string} uuid - UUID string to validate
 * @returns {boolean} True if valid UUID format
 */
function isValidUUID(uuid) {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
}

module.exports = {
  parseCSV,
  extractGoogleSheetId,
  extractGoogleSheetGid,
  buildGoogleSheetsCsvUrl,
  isUrl,
  isGoogleSheetsUrl,
  downloadUrl,
  downloadGoogleSheet,
  loadCSV,
  toPascalCase,
  isValidUUID,
};
