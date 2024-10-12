import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RssFeedReaderComponent } from './rss-feed-reader.component';
import { HttpClientModule } from '@angular/common/http';

describe('RssFeedReaderComponent', () => {
  let component: RssFeedReaderComponent;
  let fixture: ComponentFixture<RssFeedReaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, RssFeedReaderComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(RssFeedReaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
