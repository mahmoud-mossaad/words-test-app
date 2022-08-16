import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap'; 
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatRadioChange } from '@angular/material/radio';
import { afterMain } from '@popperjs/core';

//this interface for the words
interface word {
  id: number;
  word: string;
  pos: string;
}

//this is an interface for the answers given
interface answer {
  id: number;
  pos: string
}

const httpOptions = {
  headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
};

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  rank: number = 0
  finalScore: boolean = false
  public words:  Array<word> = []
  public answers: Array<answer> = []
  selectedPos: string = '';
  poss: string[] = ['adjective', 'noun', 'verb', 'adverb'];

  constructor(config: NgbCarouselConfig, private http: HttpClient) {
    //configuration of carousel for the swipe feature inside the test
    config.interval = 2000;
    config.keyboard = true;
    config.pauseOnHover = true;
  }
  ngOnInit(): void {
    //whenever the component is render we go and fetch the wordslist from the server
    this.http.get<any>('http://127.0.0.1:3080/wordsList', httpOptions).subscribe(data => {
            this.words = data
            console.log(this.words)
        })
}

  //this function is to color the right and wrong answers
getColor(answer: string, pos: string): string{
  return answer == pos ? "green" : "red";
}
  
  //this function handles the answers given by the user
  onEditAnswers(index: number, value: string){
    let idx = 0
    let found = false;
    console.log(index)
    console.log(value)
    if(this.answers.length >0){
    for(const i in this.answers){
      if(this.answers[i].id == index){
        found = true
        idx = parseInt(i)
        break
      }
  }
  if(found){
    this.answers[idx].pos = value
  }
  else{
    this.answers.push({id: index, pos: value})
  }
}
else{
  this.answers.push({id: index, pos:value})
}
}
//this function handles the submited score to the server and gets the rank to be able to render it
  onSubmit(){
    let rightAnswers = 0
    console.log(this.answers)
    console.log(this.words)
    if(this.answers.length == 10){
      for(const i in this.answers){
        if(this.answers[i].pos == this.words[i].pos){
          rightAnswers += 1;
        }
      }
      const finalScoreNum = rightAnswers/this.answers.length*100
      this.finalScore = true
      console.log(finalScoreNum)
      let body = new URLSearchParams();
      body.set('score', finalScoreNum.toString());
      this.http.post<any>('http://127.0.0.1:3080/rank', body.toString(), httpOptions).subscribe(data => {
              this.rank = data
        })
      
    }
    
  }
  }

