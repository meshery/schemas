require "pathname"

module Jekyll
  class SchemaPage < PageWithoutAFile
    def initialize(site, dir, schema_data, files, previews)
      super(site, site.source, dir, "index.html")

      self.data = {
        "layout" => "schema",
        "title" => schema_data["name"],
        "description" => schema_data["description"],
        "schema" => schema_data,
        "schema_files" => files,
        "schema_previews" => previews
      }
    end
  end

  class SchemaPagesGenerator < Generator
    safe true
    priority :normal

    def generate(site)
      schemas = site.data["schemas"]
      return unless schemas.is_a?(Array)

      schemas.each do |schema|
        next unless schema.is_a?(Hash)

        version = schema["version"].to_s
        slug = schema["name"].to_s.downcase.strip.gsub(/[^a-z0-9]+/, "-").gsub(/^-|-$/, "")
        next if version.empty? || slug.empty?

        page_url = "explorer/#{version}/#{slug}/"
        schema["page_url"] = "/#{page_url}"

        files, previews = collect_schema_artifacts(site, schema["path"])
        page = SchemaPage.new(site, page_url, schema, files, previews)
        page.data["permalink"] = "/#{page_url}"
        site.pages << page
      end
    end

    private

    def collect_schema_artifacts(site, relative_path)
      files = []
      previews = []
      return [files, previews] if relative_path.to_s.empty?

      source = site.source
      target = File.expand_path(relative_path.to_s, source)
      return [files, previews] unless File.exist?(target)

      artifact_paths = if File.directory?(target)
                         Dir.children(target)
                            .sort
                            .map { |child| File.join(target, child) }
                            .select { |f| File.file?(f) }
                       else
                         [target]
                       end

      artifact_paths.each do |abs_file|
        rel_file = Pathname.new(abs_file).relative_path_from(Pathname.new(source)).to_s
        files << rel_file

        ext = File.extname(abs_file).downcase
        next unless [".yml", ".yaml", ".json"].include?(ext)

        content = File.read(abs_file, encoding: "UTF-8")
        trimmed = content.lines.first(80).join
        if content.lines.size > 80
          trimmed += "\n# ... truncated preview ..."
        end

        previews << {
          "path" => rel_file,
          "language" => ext == ".json" ? "json" : "yaml",
          "content" => trimmed
        }
      rescue StandardError => e
        Jekyll.logger.warn("SchemaPagesGenerator:", "Could not process #{abs_file}: #{e.message}")
        next
      end

      [files, previews]
    end
  end
end
