(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{14:function(e,t,n){},16:function(e,t,n){},18:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(2),i=n.n(o),l=(n(14),n(3)),s=n(4),c=n(6),u=n(5),h=n(7),m=function(e){var t=e.text,n=e.onClick;return r.a.createElement("button",{className:"button",onClick:n},t)},d=(n(16),function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(c.a)(this,Object(u.a)(t).call(this,e))).setNextGeneration=function(){n.state.rAF&&(n.setState(function(e){return{board:(t=e.board,t.map(function(e,n){var a=t[n-1]||t[t.length-1],r=t[n+1]||t[0];return e.map(function(t,n){var o=0,i=n-1,l=n+1;return i<0&&(i=e.length-1),l>e.length-1&&(l=0),a[i]&&o++,e[i]&&o++,r[i]&&o++,a[l]&&o++,e[l]&&o++,r[l]&&o++,a[n]&&o++,r[n]&&o++,2===o?t:3===o?1:0})})),generation:e.generation+1};var t},n.drawGeneration),requestAnimationFrame(n.setNextGeneration))},n.start=function(){n.state.rAF||(n.state.board.some(function(e){return e.includes(1)})||n.setBoard(),n.setState({rAF:requestAnimationFrame(n.setNextGeneration)}))},n.pause=function(){cancelAnimationFrame(n.state.rAF),n.setState({rAF:null})},n.clear=function(){cancelAnimationFrame(n.state.rAF),n.setState({board:Array(n.numRows).fill(Array(n.numCellsInRow).fill(0)),generation:0,rAF:null},n.drawGeneration)},n.reset=function(){n.pause(),n.setBoard()},n.toggleCellState=function(e){e.persist();var t=e.target.getBoundingClientRect(),a=e.clientX-t.x,r=e.clientY-t.y,o=Math.floor(a/n.cellWidthPx),i=Math.floor(r/n.cellWidthPx);n.setState({board:n.state.board.map(function(e,t){return t===i?e.map(function(e,t){return t===o?e?0:1:e}):e})},n.drawGeneration)},n.state={board:[],generation:0,rAF:null},n.numCellsInRow=60,n.numRows=33,n.cellWidthPx=12,n.canvas=null,n.ctx=null,n}return Object(h.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=this.refs.canvas,t=e.getContext("2d");e.width=1440,e.height=792,e.style.width="720px",e.style.height="396px",t.scale(2,2),this.canvas=e,this.ctx=t,this.setBoard(),this.start()}},{key:"setBoard",value:function(){for(var e=[],t=0;t<this.numRows;t++){for(var n=[],a=0;a<this.numCellsInRow;a++)n.push(Math.random()>.8?1:0);e.push(n)}this.setState({board:e,generation:0},this.drawGeneration)}},{key:"drawGeneration",value:function(){var e=this,t=this.canvas,n=this.ctx;n.clearRect(0,0,t.width,t.height),this.state.board.forEach(function(t,a){t.forEach(function(t,r){if(t){var o=Math.floor(r*e.cellWidthPx),i=Math.floor(a*e.cellWidthPx);n.fillStyle="#009cde",n.fillRect(o,i,e.cellWidthPx,e.cellWidthPx)}})})}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"App"},r.a.createElement("div",{className:"container"},r.a.createElement("h1",null,"Game of Life"),r.a.createElement("p",{className:"generation"},"Generation: ",this.state.generation),r.a.createElement("div",null,this.state.rAF?r.a.createElement(m,{onClick:this.pause,text:"Pause"}):r.a.createElement(m,{onClick:this.start,text:this.state.generation?"Resume":"Start"}),r.a.createElement(m,{onClick:this.clear,text:"Clear"}),r.a.createElement(m,{onClick:this.reset,text:"Reset"})),r.a.createElement("canvas",{onClick:function(t){return e.toggleCellState(t)},ref:"canvas",className:"board",width:"720",height:"396"}),r.a.createElement("footer",{className:"footer"},r.a.createElement("p",null,"Learn about Conway's Game of Life on ",r.a.createElement("a",{href:"https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life"},"Wikipedia"),"."))))}}]),t}(a.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(d,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},8:function(e,t,n){e.exports=n(18)}},[[8,2,1]]]);
//# sourceMappingURL=main.ef6962c2.chunk.js.map