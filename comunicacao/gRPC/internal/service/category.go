package service

import (
	"context"

	"bitbucket.org/ricardosoliveira/fullcycle-arquitetura-sw/comunicacao/gRPC/internal/pb"
	"google.golang.org/grpc"
)


type CategoryService struct {
	pb.UnimplementedCategoryServiceServer
}

func NewCategoryService() *CategoryService {
	return &CategoryService{ }
}


func (c *CategoryService) CreateCategory(ctx context.Context, in *pb.CreateCategoryRequest) (*pb.CategoryResponse, error) {
	
	categoryResponse := &pb.Category{
		Id: "1",
		Name: in.Name,
		Description: in.Description,
	}

	return &pb.CategoryResponse{
		Category: categoryResponse,
	}, nil
}

func (c *CategoryService) ListCategories(context.Context, *pb.Blank) (*pb.CategoryList, error){
	category1 := &pb.Category{
		Id: "1",
		Name: "Cat 1",
		Description: "Cat1 Desc",
	}

	category2 := &pb.Category {
		Id: "2",
		Name: "Cat 2",
		Description: "Cat2 Desc",
	}

	var categoriesResponse  []*pb.Category

	categoriesResponse = append(categoriesResponse, category1)
	categoriesResponse = append(categoriesResponse, category2)

	return &pb.CategoryList{Categories: categoriesResponse}, nil
}

func (c *CategoryService) GetCategory(ctx context.Context, in *pb.GetCategoryRequest, opts ...grpc.CallOption) (*pb.Category, error){
	category := &pb.Category{
		Id: in.Id,
		Name: "Cat GET",
		Description: "Cat GET Desc",
	}
	
	return category, nil
}