import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BoardPosition } from '../interfaces/board.position';
import { CellState } from '../interfaces/cell.state';

@Injectable({
  providedIn: 'root'
})
export class TicTacToeService {
  _state: BoardPosition =[
    null, null, null,
    null, null, null,
    null, null, null
  ];
  stateBehaviorSubject: BehaviorSubject<BoardPosition> = new BehaviorSubject<BoardPosition>(this.state);
  history: BoardPosition[] = [this.state];
  _xIsNext = false;
  xIsNextBehaviorSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  _stepNumber = 0;
  stepNumberBehaviorSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  _winner: CellState = null;
  winnerBehaviorSubject: BehaviorSubject<CellState> = new BehaviorSubject<CellState>(null);

  constructor() { }

  getState(){
    return this.stateBehaviorSubject.asObservable();
  }

  get state(): BoardPosition{
    return this._state;
  }

  set state(state: BoardPosition) {
    this._state = state;
    this.stateBehaviorSubject.next(state);
  }

  getXIsNext(){
    return this.xIsNextBehaviorSubject.asObservable();
  }

  get xIsNext(): boolean{
    return this._xIsNext;
  }

  set xIsNext(xIsNext: boolean){
    this._xIsNext = xIsNext;
    this.xIsNextBehaviorSubject.next(xIsNext);
  }

  getStepNumber(){
    return this.stepNumberBehaviorSubject.asObservable();
  }


  public get stepNumber(): number {
    return this._stepNumber;
  }

  public set stepNumber(stepNumber: number) {
    this._stepNumber = stepNumber;
    this.stepNumberBehaviorSubject.next(stepNumber);
  }


  getWinner(){
    return this.winnerBehaviorSubject.asObservable();
  }

  public get winner(): CellState {
    return this._winner;
  }

  public set winner(winner: CellState) {
    this._winner = winner;
    this.winnerBehaviorSubject.next(winner);
  }

  select(i: number){
    if (this.winner) {
      return;
    }
    if (this.stepNumber !== this.history.length - 1) {
      this.history.splice(this.stepNumber + 1, this.history.length - this.stepNumber)
    }
    let state = this.state.slice() as BoardPosition;
    state[i] = this.xIsNext? 'X' : 'O';
    this.state = state;
    this.xIsNext = !this.xIsNext;
    this.stepNumber++;
    this.history.push(state);
    this.winner = this.checkForVictory();
  }

  goBackTo(i: number){
    console.log(i < this.history.length && i >= 0);
    if (i < this.history.length && i >= 0) {
      this.state = this.history[i];
      this.stepNumber = i;
      this.xIsNext = !!(i % 2);
      this.winner = this.checkForVictory();
    }
  }

  checkForVictory(): CellState {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      let [a, b, c] = lines[i];
      if (this.state[a] && this.state[a] === this.state[b] && this.state[a] === this.state[c]) {
        return this.state[a];
      }
    }
    return null;
  }

}
