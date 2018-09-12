import { Component, OnInit } from '@angular/core';
import { TradeService } from './trade.service';
import { Trade } from './trades';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Magnus Capital Equity Trading Platform';

  tickerInput: string;
  numShares: string;
  longPeriod: string;
  shortPeriod: string;
  period: string;
  strategyOption: string;
  isTwoMA: boolean;
  body: string;
  response: string;
  _tradesArray: Trade[];
  // tradeList = [ ];

  /** */
  stocks: any;

  constructor(private tradeService: TradeService) {
    // this.stock = this.homeService;
  }


  ngOnInit() {

    console.log('TEST STRING FROM ANGULAR');
    this.tradeService.getAll().subscribe(data => {
      this.stocks = data;
      console.log(data);
    });
  }

  // getHistory () {
  //   this.tradeService.getAllTrades().subscribe(data => {
  //     this.tradeList = data;
  //     console.log(this.tradeList);
  //   });
  // }
  getTrades() {
    this.tradeService.getAllTrades()
        .subscribe(
            resultArray => this._tradesArray = resultArray,
            error => console.log('Error :: ' + error)
        );
  }

  strategySelect() {
    if (this.strategyOption === 'bbOption') {
      this.isTwoMA = false;
    } else {
      this.isTwoMA = true;
    }
  }

  onSubmit() {
    this.body = this.tickerInput + '_' + this.numShares + '_' + this.longPeriod + '_' + this.shortPeriod + '_' + this.period;
    console.log('this.body: ' + this.body);
    if (this.strategyOption === 'bbOption') {
      console.log('select BB');
      this.tradeService.runBB(this.body).subscribe(data => {
        this.response = data.status;
        console.log('success!');
      });
    } else {
      console.log('select MA');
      this.tradeService.runTwoMA().subscribe(data => {
        this.response = data.status;
        console.log('success!');
      });
    }
  }
}


