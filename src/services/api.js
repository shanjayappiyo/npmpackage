const ACTIVE_CHATS = 'https://qa.twixor.digital/moc/e/enterprise/chat/summary';
const CLOSED_CHATS = 'https://qa.twixor.digital/moc/e/enterprise/chat/summary';
const TOKEN = 'uKJkA3WW1DeuZOzF2hZytmrzax8E28DdBqM/TZffOH8fXZJCEMLuKFgxM9RtZPcl';

let myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("authentication-token", TOKEN);

export async function activeChats() {
    const response = await fetch(ACTIVE_CHATS, { crossDomain: true, headers: myHeaders });
    const activedata = await response.json();
    return activedata;
}

export async function closedChats() {
    const response = await fetch(CLOSED_CHATS, { crossDomain: true, headers: myHeaders });
    const closeddata = await response.json();
    return closeddata;
}


