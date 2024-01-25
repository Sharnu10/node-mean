import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the logo and "Chat" text in the navbar', () => {
    const logoElement = fixture.nativeElement.querySelector('.logo');
    const chatTextElement =
      fixture.nativeElement.querySelector('.navbar-brand span');

    expect(logoElement).toBeTruthy();
    expect(chatTextElement.textContent).toContain('Chat');
  });
});
