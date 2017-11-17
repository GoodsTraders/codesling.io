const startingText =
`function hello() {
  console.log('hello!');
}

hello();
`;

/**
 *
 *  Rooms store
 *
 */
export default class Rooms {
  constructor(io) {
    this.io = io;
    this.store = new Map();
  }

  findOrCreate(roomId) {
    let room = this.store.get(roomId);
    let testStart = `it('Enter Your Testcase Here!', function() 
    {expect('FILL_ME_IN').to.equal('FILL_ME_IN');
});`
    if (!room) {
      room = new Map();
      room.set('id', roomId);
      room.set('text', startingText);
      room.set('testText', testStart);
      this.store.set(roomId, room);
    }
    return room;
  }
}
