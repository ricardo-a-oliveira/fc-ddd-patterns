package service

import (
	"context"
	"io"
	"strconv"

	"bitbucket.org/ricardosoliveira/fullcycle-arquitetura-sw/comunicacao/gRPC/internal/pb"
)


type CategoryService struct   {
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

func (c *CategoryService) GetCategory(ctx context.Context, in *pb.GetCategoryRequest ) (*pb.CategoryResponse, error) {
	category := &pb.Category {
		Id: "4",
		Name: "CAategoty 4",
		Description: "Desc cat4",
	}
	
	out := &pb.CategoryResponse{
		Category: category,
	}
	return out, nil
}


func (c *CategoryService) CreateCategoryStream(stream pb.CategoryService_CreateCategoryStreamServer) error {
	categories := &pb.CategoryList{}
	id := 1
	for {
		category, err := stream.Recv()
		if err == io.EOF {
			return stream.SendAndClose(categories)
		}
		if err != nil {
			return err
		}

		categories.Categories = append(categories.Categories, &pb.Category{
			Id: strconv.Itoa (id),
			Name: category.Name,
			Description: category.Description,
		})

		id = id+1
	}
}

func (c *CategoryService) CreateCategoryBidirectStream(stream pb.CategoryService_CreateCategoryBidirectStreamServer) error {
	id := 1

	for {
		category, err := stream.Recv()
		if( err == io.EOF){
			return nil
		}
		if err != nil {
			return err
		}

		err = stream.Send(&pb.Category{
			Id: strconv.Itoa(id),
			Name: category.Name,
			Description:  category.Description,
		})

		if err != nil {
			return err
		}

		id = id +1
	}
}
