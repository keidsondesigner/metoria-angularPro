import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductSearchService } from './product-search.service';
import { Product } from '../../model/product.model';

describe('ProductSearchService', () => {
  let service: ProductSearchService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ProductSearchService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return products correctly', () => {
    // ARRANGE
    const mockName = 'notebook';
    const mockProducts: Product[] = [
      {
        "createdAt": "2023-10-10T03:25:53.791Z",
        "name": "Oriental Cotton Chicken",
        "price": "536.00",
        "description": "New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016",
        "image": "https://loremflickr.com/640/480/nature",
        "id": "1",
        "quantity": 1
      },
      {
        "createdAt": "2023-10-09T20:45:06.372Z",
        "name": "Recycled Cotton Shoes",
        "price": "927.00",
        "description": "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals",
        "image": "https://loremflickr.com/640/480/fashion",
        "id": "2",
        "quantity": 1
      },
    ];

    const url = `${service.baseUrl}/products?name=${mockName}`;
    let result: Product[] = [];

    // ACT
    service.searchByTerm(mockName).subscribe((products) => (result = products));

    // ASSERT
    const req = httpMock.expectOne(url);
    req.flush(mockProducts);
    expect(req.request.method).toBe('GET');
    expect(result).toEqual(mockProducts);
  });

  it('should return products byId correctly', () => {
    // ARRANGE
    const mockId = '2';
    const mockProducts: Product[] = [
      {
        "createdAt": "2023-10-10T03:25:53.791Z",
        "name": "Oriental Cotton Chicken",
        "price": "536.00",
        "description": "New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016",
        "image": "https://loremflickr.com/640/480/nature",
        "id": "1",
        "quantity": 1
      },
      {
        "createdAt": "2023-10-09T20:45:06.372Z",
        "name": "Recycled Cotton Shoes",
        "price": "927.00",
        "description": "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals",
        "image": "https://loremflickr.com/640/480/fashion",
        "id": "2",
        "quantity": 1
      },
    ];

    const url = `${service.baseUrl}/products/${mockId}`;
    let result!: Product;

    // ACT
    service.getById(mockId).subscribe((product) => (result = product));

    // ASSERT
    const req = httpMock.expectOne(url);
    req.flush(mockProducts[0]);
    expect(req.request.method).toBe('GET');
    expect(result).toEqual(mockProducts[0]);
  });
});
