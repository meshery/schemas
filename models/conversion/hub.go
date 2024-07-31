package conversion

type Hub interface {
	Hub()
}

type Convertible interface {
	ConvertTo(dst Hub) error
	ConvertFrom(src Hub) error 
}

