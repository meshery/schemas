package validate

import (
	"github.com/layer5io/meshkit/logger"
	"github.com/sirupsen/logrus"
)

var log logger.Handler

func SetLogger(l logger.Handler) {
	log = l
}

func initLoggerOnce() error {
	if log != nil {
		return nil
	}

	var err error
	log, err = logger.New(
		"schemas",
		logger.Options{
			Format:   logger.SyslogLogFormat,
			LogLevel: int(logrus.InfoLevel),
		},
	)
	if err != nil {
		return err
	}
	return nil
}
