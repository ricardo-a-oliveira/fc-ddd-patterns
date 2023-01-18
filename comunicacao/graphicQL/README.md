Site da ferramenta de geração de código GraphicQL

https://gqlgen.com/

Criar modulo com GO

go mod init comunicacao/graphicQL

Gerar dependencias do gqlgen

printf '// +build tools\npackage tools\nimport (_ "github.com/99designs/gqlgen"\n _ "github.com/99designs/gqlgen/graphql/introspection")' | gofmt > tools.go

Baixar as dependencias

go mod tidy 

Gerar as dependecias GraphicsQL
go run github.com/99designs/gqlgen init


Gerar codigo baseado no schema do GraphQL
go run github.com/99designs/gqlgen generate