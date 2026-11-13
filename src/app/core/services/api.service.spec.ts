import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { Product, SubsidyCalculationInput, SubsidyCalculationResult } from '../models/interfaces';

describe('ApiService & Subsidy Calculation Logic', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch product catalog via GET /api/v1/products/', () => {
    const mockProducts: Product[] = [
      {
        id: 1,
        title_en: 'Drip Irrigation Kit',
        title_ta: 'சொட்டு நீர் பாசனம்',
        desc: 'Advanced drip system',
        price_numeric: 24500,
        price_unit_text: '/ Acre',
        icon_class: 'fa-faucet-drip',
        image_url: '/photos/drip.png',
        is_subsidy_eligible: true
      }
    ];

    service.getProducts().subscribe(products => {
      expect(products.length).toBe(1);
      expect(products[0].title_en).toBe('Drip Irrigation Kit');
      expect(products[0].price_numeric).toBe(24500);
    });

    const req = httpMock.expectOne('/api/v1/products/');
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });

  it('should post subsidy calculation to /api/v1/calculate/', () => {
    const input: SubsidyCalculationInput = {
      farmer_name: 'M. Selvam',
      phone_number: '9876543210',
      district: 'Dindigul',
      product_id: 1,
      land_size_acres: 3.5
    };

    const mockResponse: SubsidyCalculationResult = {
      status: 'success',
      quote_id: 101,
      farmer_name: 'M. Selvam',
      product_title: 'Drip Irrigation Kit',
      land_acres: 3.5,
      project_cost: 85750,
      subsidy_amount: 85750,
      farmer_contribution: 0,
      subsidy_percent: 100,
      tier_label: '100% Grant — Small Farmer',
      explanation: 'Full Tamil Nadu Government grant.'
    };

    service.calculateSubsidy(input).subscribe(res => {
      expect(res.status).toBe('success');
      expect(res.subsidy_percent).toBe(100);
      expect(res.farmer_contribution).toBe(0);
      expect(res.quote_id).toBe(101);
    });

    const req = httpMock.expectOne('/api/v1/calculate/');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(input);
    req.flush(mockResponse);
  });

  it('should post contact form to /api/v1/contact/', () => {
    const contactData = {
      name: 'R. Kannan',
      phone: '9842100000',
      district: 'Theni',
      subject: 'Inquiry',
      message: 'Need quotation for 10 acres.'
    };

    service.submitContact(contactData).subscribe(res => {
      expect(res.status).toBe('success');
    });

    const req = httpMock.expectOne('/api/v1/contact/');
    expect(req.request.method).toBe('POST');
    req.flush({ status: 'success', message: 'Inquiry received' });
  });
});
