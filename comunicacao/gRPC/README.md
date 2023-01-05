# Comandos basicos GO e gRPC


## Gerar os arquivos baseado no arquivo de definição protobuff

protoc --go_out=. --go-grpc_out=. proto/course_category.proto 

## Rodar o programa em GO

go run cmd/grpcServer/main.go 

## Evans

Programa em GO que serve como client gRPC
https://github.com/ktr0731/evans#docker-image

instalar usando o GO

go install github.com/ktr0731/evans@latest

rodar usando reflection
evans -r repl