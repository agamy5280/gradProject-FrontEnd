import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { CardService } from 'src/app/services/card.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paymentpage',
  templateUrl: './paymentpage.component.html',
  styleUrls: ['./paymentpage.component.scss']
})
export class PaymentpageComponent implements OnInit {
  
 userId=""
 public months=['','01','02', '03','04','05','06','07','08','09', '10', '11','12']
 public years=['','23','24', '25','26','27','28','29','30','31', '32', '34','35']


     
  expire_date= '';
  expire_year="";
  expire_month="";
  selectedDay: string = '';

  
  constructor(private userService: UserService,private cardService:CardService,private _router: Router){

  }
  
 




  //event handler for the select element's change event
  selectChangeHandler (event: any) {
    //update the ui
    this.selectedDay = event.target.value;
    
  }

  cardForm = new FormGroup({
    cardNumber0: new FormControl('',Validators.required),
    cardNumber1: new FormControl('',Validators.required),
    cardNumber2: new FormControl('',Validators.required),
    cardNumber3: new FormControl('',Validators.required),
    bankName: new FormControl('',),
    card_cvv:new FormControl('',)
  //  let card_Number12=this.cardForm.cardNumber0.value ;
  })





  ngOnInit(): void {
    this.userId=this.userService.getUserID();    
  }


  async addCard() {
    (await this.cardService.addCardRequest( this.cardDetails(),this.userId)).subscribe({
      next: (res:any) => console.log(res),
      error: (err:any) =>  {alert("Expired card")},
      complete: () => {alert("Card added successfully"), this._router.navigate(['balance']);}

    })  
  }


  cardDetails(){
   
  return { 
    bank_name:this.cardForm.value.bankName,
    card_Number:this.getCardNumber(),
    exp_date:this.getExpereDate(),
    CVV:this.cardForm.value.card_cvv,
    userID:this.userId}

  }


  getCardNumber(){
    let str="";
    const c0=this.cardForm.value.cardNumber0
    const c1=this.cardForm.value.cardNumber1
    const c2=this.cardForm.value.cardNumber2
    const c3=this.cardForm.value.cardNumber3
     let cardNumber=[c0,c1,c2,c3]
     cardNumber.forEach(function (value) {
      str+=value;
    });

     return str;

  }

  
  getExpereDate(){
     return this.expire_month + '/' + this.expire_year;

  }
  

	getYear(e:any) {
		this.expire_year= e.target.value
	}

  
	getMonth(e:any) {
    this.expire_month= e.target.value
	}
}
