package main

import (
	"net"
	"bitbucket.org/ricardosoliveira/fullcycle-arquitetura-sw/comunicacao/gRPC/internal/pb"
	"bitbucket.org/ricardosoliveira/fullcycle-arquitetura-sw/comunicacao/gRPC/internal/service"
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
)


func main() {

	categoryService := service.NewCategoryService();

	grpcServer := grpc.NewServer()
	reflection.Register(grpcServer)

	pb.RegisterCategoryServiceServer(grpcServer, categoryService)

	lis, err := net.Listen("tcp", ":50051")

	if err != nil {
		panic(err)
	}

	if err := grpcServer.Serve(lis); err != nil {
		panic(err)
	}

}
