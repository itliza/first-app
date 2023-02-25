import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatComponent } from './chat.component';

//const ServerIP = "127.0.0.1";
const ServerIP = "18.184.233.97";
let ws;
let wsfailcount = 0;

function SendAuthentication() {
  let urlParams = new URLSearchParams(window.location.search);
  let SSOtoken = urlParams.get('logintoken');
  ws.send('{"function":"SSOAuthentication","token":"' + SSOtoken + '"}');
}

function connectws() {
  ws = new WebSocket('ws://' + ServerIP + ':7071/ws');

  ws.onerror = (message) => {
    console.log(ws);
    console.log(message);
    //TODO if ws fails to connect 3 times, try backup
    //const ws = new WebSocket('ws://backup:7071/ws');
  }

  ws.onopen = (message) => {
    const d = new Date();
    let time = d.getTime();
    wsfailcount = 0;
    console.log("Socket OPEN:" + time);
    SendAuthentication();
    //Do we display some connected indicator or something womewhere
  }


  ws.onmessage = (webSocketMessage) => {
    //interpret message this will be a large switch
    let messageBody = JSON.parse(webSocketMessage.data);
    if(messageBody.pong) return;
    switch (messageBody.function){
      case "GanttData": DrawGantt(messageBody); break;
      case "GanttColorMap": GanttColorMap(messageBody); break;
      case "ChatMessage": ChatMessageNew(messageBody.message); break;
      case "ChatMessages": ChatMessageNew(messageBody.message); break;
      case "SSOAuthentication": SendAuthentication(); break;
    }
  };

  ws.onclose = (message) => {
    const d = new Date();
    let time = d.getTime();
    console.log("Socket CLOSED:" + time);
    console.log(message);
    wsfailcount++;
    if (wsfailcount<3)
      connectws();
    else {
      clearInterval(interval);
      console.log("abandoning WS reconnect failed " + wsfailcount);
    }
    //TODO try to reconnect?
  }
}
connectws();

const interval = setInterval(function() {
  let messageBody = {ping:1};
  ws.send(JSON.stringify(messageBody));
}, 5000);

//TODO call on logout
function closeWS() {
  ws.close();
  //TODO redirect to login page
}

function DrawGantt(data) {
  console.log(data);
}
function getGnattData(date,plan) {
  let messageBody = { function: 'GanttData',date: date, plan: plan };
  ws.send(JSON.stringify(messageBody));
}
//Will later be loaded as part of settings json on user
function GanttColorMap(message) {
  var colors = message.ColorMap //make this global and store it
  let nameFromData='start'
  console.log(colors[nameFromData]);
  console.log(message.ColorMap);
}
function getGanttColorMap(UserID) {
  let messageBody = { function: 'GanttColorMap',UserID: UserID };
  ws.send(JSON.stringify(messageBody));
}
function MoveGanttStep(PlanID,OldTruckID,NewTruckID,StepID,NewTime) {
  let messageBody = { function: 'MoveGanttStep',PlanID: PlanID, OldTruckID: OldTruckID, NewTruckID: NewTruckID, StepID: StepID, NewTime: NewTime };
  ws.send(JSON.stringify(messageBody));
}

function ChatSend(ChatRoomID) {
  let message = document.getElementById("chatinput").value;
  let messageBody = { function: 'ChatMessage',message: message, ChatRoomID: ChatRoomID };
  ws.send(JSON.stringify(messageBody));

}

function ChatMessageNew(message) {
  document.getElementById("chatwindow").innerHTML += message + '<br>';
}

function GetChatHistory(ChatRoomID) {
  let messageBody = { function: 'GetChatHistory',ChatRoomID: ChatRoomID };
  ws.send(JSON.stringify(messageBody));
}

function GetChatRooms () {
  let messageBody = { function: 'GetChatRooms' };
  ws.send(JSON.stringify(messageBody));
}

describe('ChatComponent', () => {
  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
