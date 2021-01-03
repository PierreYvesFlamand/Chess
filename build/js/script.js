let currentPlayer=0;const Pawns=[white=[pawn=[{id:"pawn-w-0",color:"white",moveType:"pawn",x:0,y:6},{id:"pawn-w-1",color:"white",moveType:"pawn",x:1,y:6},{id:"pawn-w-2",color:"white",moveType:"pawn",x:2,y:6},{id:"pawn-w-3",color:"white",moveType:"pawn",x:3,y:6},{id:"pawn-w-4",color:"white",moveType:"pawn",x:4,y:6},{id:"pawn-w-5",color:"white",moveType:"pawn",x:5,y:6},{id:"pawn-w-6",color:"white",moveType:"pawn",x:6,y:6},{id:"pawn-w-7",color:"white",moveType:"pawn",x:7,y:6}],rook=[{id:"rook-w-0",color:"white",moveType:"rook",x:0,y:7,first_move:!0},{id:"rook-w-1",color:"white",moveType:"rook",x:7,y:7,first_move:!0}],knight=[{id:"knight-w-0",color:"white",moveType:"knight",x:1,y:7},{id:"knight-w-1",color:"white",moveType:"knight",x:6,y:7}],bishop=[{id:"bishop-w-0",color:"white",moveType:"bishop",x:2,y:7},{id:"bishop-w-1",color:"white",moveType:"bishop",x:5,y:7}],queen=[{id:"queen-w",color:"white",moveType:"queen",x:3,y:7}],king=[{id:"king-w",color:"white",moveType:"king",x:4,y:7,first_move:!0}]],black=[pawn=[{id:"pawn-b-0",color:"black",moveType:"pawn",x:0,y:1},{id:"pawn-b-1",color:"black",moveType:"pawn",x:1,y:1},{id:"pawn-b-2",color:"black",moveType:"pawn",x:2,y:1},{id:"pawn-b-3",color:"black",moveType:"pawn",x:3,y:1},{id:"pawn-b-4",color:"black",moveType:"pawn",x:4,y:1},{id:"pawn-b-5",color:"black",moveType:"pawn",x:5,y:1},{id:"pawn-b-6",color:"black",moveType:"pawn",x:6,y:1},{id:"pawn-b-7",color:"black",moveType:"pawn",x:7,y:1}],rook=[{id:"rook-b-0",color:"black",moveType:"rook",x:0,y:0,first_move:!0},{id:"rook-b-1",color:"black",moveType:"rook",x:7,y:0,first_move:!0}],knight=[{id:"knight-b-0",color:"black",moveType:"knight",x:1,y:0},{id:"knight-b-1",color:"black",moveType:"knight",x:6,y:0}],bishop=[{id:"bishop-b-0",color:"black",moveType:"bishop",x:2,y:0},{id:"bishop-b-1",color:"black",moveType:"bishop",x:5,y:0}],queen=[{id:"queen-b",color:"black",moveType:"queen",x:3,y:0}],king=[{id:"king-b",color:"black",moveType:"king",x:4,y:0,first_move:!0}]]],grid=[[Pawns[1][1][0],Pawns[1][2][0],Pawns[1][3][0],Pawns[1][4][0],Pawns[1][5][0],Pawns[1][3][1],Pawns[1][2][1],Pawns[1][1][1]],[Pawns[1][0][0],Pawns[1][0][1],Pawns[1][0][2],Pawns[1][0][3],Pawns[1][0][4],Pawns[1][0][5],Pawns[1][0][6],Pawns[1][0][7]],[null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null],[Pawns[0][0][0],Pawns[0][0][1],Pawns[0][0][2],Pawns[0][0][3],Pawns[0][0][4],Pawns[0][0][5],Pawns[0][0][6],Pawns[0][0][7]],[Pawns[0][1][0],Pawns[0][2][0],Pawns[0][3][0],Pawns[0][4][0],Pawns[0][5][0],Pawns[0][3][1],Pawns[0][2][1],Pawns[0][1][1]]];function toggleModal({modal:e=null,winner:o=null,pawnToPromote:n=null}){const l=document.querySelector(".modal");l.style.display="none"===l.style.display?"flex":"none";const i={start:'\n            <h1>Chess</h1>\n            <h2>How to play</h2>\n            <ul>\n                <li>Hover a pawn to know which move it can performs</li>\n                <li>Click a pawn and then a square to move the pawn</li>\n            </ul>\n            <h2>Rules availables</h2>\n            <ul>\n                <li>Pawn promotion (reach ennemy last first row with a pawn to promote it)</li>\n                <li>Castling (click the king to perform it)</li>\n            </ul>\n            <button onclick="start_game()">Start the game</button>\n        ',end:`\n            <h1>Game end !</h1>\n            <h2>${o} player wins the game</h2>\n            <button onclick="location.reload()">Play again</button>\n        `,promotion:'\n            <h1>Pawn promotion !</h1>\n            <h2>Choose your promotion</h2>\n            <button id="promot-q">Queen</button>\n            <button id="promot-k">Knight</button>\n            <button id="promot-b">Bishop</button>\n            <button id="promot-r">Rook</button>\n        '};document.querySelector(".modal-card").innerHTML=e?i[e]:"",n&&(document.querySelector("#promot-q").addEventListener("click",()=>{pawn_promotion(n,"queen"),toggleModal({})}),document.querySelector("#promot-k").addEventListener("click",()=>{pawn_promotion(n,"knight"),toggleModal({})}),document.querySelector("#promot-b").addEventListener("click",()=>{pawn_promotion(n,"bishop"),toggleModal({})}),document.querySelector("#promot-r").addEventListener("click",()=>{pawn_promotion(n,"rook"),toggleModal({})}))}function start_game(){toggleModal({}),pawn_sellection(!0)}function next_turn(){currentPlayer=currentPlayer?0:1,pawn_sellection(!0)}function pawn_sellection(e){Pawns[currentPlayer].forEach(o=>{o.forEach(o=>{const n=calculate_possible_moves(o);if(0!=n.length){const l=document.getElementById(o.id);if(l.classList.toggle("is-askSelection"),e)l.addEventListener("click",function(){ask_possible_moves(o,n,!0),pawn_sellection(!1)}),l.addEventListener("mouseover",function(){show_possible_moves(n,!0)}),l.addEventListener("mouseout",function(){show_possible_moves(n,!1)});else{const e=l.cloneNode(!0);l.parentNode.replaceChild(e,l)}}})})}function show_possible_moves(e,o){e.forEach(e=>{const n=document.getElementById("pos-"+e.x+"-"+e.y);if(n.classList.toggle("is-possible-move"),!o){const e=n.cloneNode(!0);n.parentNode.replaceChild(e,n)}})}function ask_possible_moves(e,o,n){document.getElementById(e.id).classList.toggle("is-askedSelection"),document.getElementById("grid").classList.toggle("grid-disable"),o.forEach(l=>{const i=document.getElementById("pos-"+l.x+"-"+l.y);if(n)i.addEventListener("click",function(){ask_possible_moves(e,o,!1),move_pawn(e,l)});else{i.classList.toggle("is-possible-move");const e=i.cloneNode(!0);i.parentNode.replaceChild(e,i)}})}function calculate_possible_moves(e){let o=[];switch(e.moveType){case"pawn":o=pawn_logic(e);break;case"rook":o=rook_logic(e);break;case"knight":o=knight_logic(e);break;case"bishop":o=bishop_logic(e);break;case"queen":o=queen_logic(e);break;case"king":o=king_logic(e);break;default:console.error("Swicth error",e)}return o}function is_possible_moves(e){const o=[];return e.forEach(e=>{for(j=0;j<e.length&&("empty"===check_if_pos_is_reachable(e[j])||"has-pawn-to-kill"===check_if_pos_is_reachable(e[j]));j++){if("has-pawn-to-kill"===check_if_pos_is_reachable(e[j])){o.push({...e[j],kill:grid[e[j].y][e[j].x]});break}o.push({...e[j],kill:null})}}),o}function check_if_pos_is_reachable(e){return e.y<0||e.y>7||e.x<0||e.x>7?"out-of-board":null===grid[e.y][e.x]?"empty":grid[e.y][e.x].color===(currentPlayer?"black":"white")?"has-friendly-pawn":"has-pawn-to-kill"}function pawn_logic(e){const o=[];return pos={x:e.x,y:currentPlayer?e.y+1:e.y-1},"empty"===check_if_pos_is_reachable(pos)&&(o.push({...pos,kill:null}),e.y==(currentPlayer?1:6)&&(pos={x:e.x,y:currentPlayer?e.y+2:e.y-2},"empty"===check_if_pos_is_reachable(pos)&&o.push({...pos,kill:null}))),pos=[{x:e.x+1,y:currentPlayer?e.y+1:e.y-1},{x:e.x-1,y:currentPlayer?e.y+1:e.y-1}],pos.forEach(e=>{"has-pawn-to-kill"===check_if_pos_is_reachable(e)&&o.push({...e,kill:grid[e.y][e.x]})}),o}function rook_logic(e){return pos=[[{x:e.x,y:e.y+1},{x:e.x,y:e.y+2},{x:e.x,y:e.y+3},{x:e.x,y:e.y+4},{x:e.x,y:e.y+5},{x:e.x,y:e.y+6},{x:e.x,y:e.y+7}],[{x:e.x,y:e.y-1},{x:e.x,y:e.y-2},{x:e.x,y:e.y-3},{x:e.x,y:e.y-4},{x:e.x,y:e.y-5},{x:e.x,y:e.y-6},{x:e.x,y:e.y-7}],[{x:e.x+1,y:e.y},{x:e.x+2,y:e.y},{x:e.x+3,y:e.y},{x:e.x+4,y:e.y},{x:e.x+5,y:e.y},{x:e.x+6,y:e.y},{x:e.x+7,y:e.y}],[{x:e.x-1,y:e.y},{x:e.x-2,y:e.y},{x:e.x-3,y:e.y},{x:e.x-4,y:e.y},{x:e.x-5,y:e.y},{x:e.x-6,y:e.y},{x:e.x-7,y:e.y}]],is_possible_moves(pos)}function knight_logic(e){return pos=[[{x:e.x-2,y:e.y-1}],[{x:e.x-2,y:e.y+1}],[{x:e.x-1,y:e.y-2}],[{x:e.x-1,y:e.y+2}],[{x:e.x+1,y:e.y-2}],[{x:e.x+1,y:e.y+2}],[{x:e.x+2,y:e.y-1}],[{x:e.x+2,y:e.y+1}]],is_possible_moves(pos)}function bishop_logic(e){return pos=[[{x:e.x-1,y:e.y-1},{x:e.x-2,y:e.y-2},{x:e.x-3,y:e.y-3},{x:e.x-4,y:e.y-4},{x:e.x-5,y:e.y-5},{x:e.x-6,y:e.y-6},{x:e.x-7,y:e.y-7}],[{x:e.x+1,y:e.y-1},{x:e.x+2,y:e.y-2},{x:e.x+3,y:e.y-3},{x:e.x+4,y:e.y-4},{x:e.x+5,y:e.y-5},{x:e.x+6,y:e.y-6},{x:e.x+7,y:e.y-7}],[{x:e.x-1,y:e.y+1},{x:e.x-2,y:e.y+2},{x:e.x-3,y:e.y+3},{x:e.x-4,y:e.y+4},{x:e.x-5,y:e.y+5},{x:e.x-6,y:e.y+6},{x:e.x-7,y:e.y+7}],[{x:e.x+1,y:e.y+1},{x:e.x+2,y:e.y+2},{x:e.x+3,y:e.y+3},{x:e.x+4,y:e.y+4},{x:e.x+5,y:e.y+5},{x:e.x+6,y:e.y+6},{x:e.x+7,y:e.y+7}]],is_possible_moves(pos)}function queen_logic(e){return rook_logic(e).concat(bishop_logic(e))}function king_logic(e){return pos=[[{x:e.x-1,y:e.y-1}],[{x:e.x-1,y:e.y}],[{x:e.x-1,y:e.y+1}],[{x:e.x,y:e.y-1}],[{x:e.x,y:e.y+1}],[{x:e.x+1,y:e.y-1}],[{x:e.x+1,y:e.y}],[{x:e.x+1,y:e.y+1}]],possibleMoves=is_possible_moves(pos),e.first_move&&(0===currentPlayer?(Pawns[0][1][1].first_move&&"empty"===check_if_pos_is_reachable({x:5,y:7})&&"empty"===check_if_pos_is_reachable({x:6,y:7})&&possibleMoves.push({x:6,y:7,castle:3}),Pawns[0][1][0].first_move&&"empty"===check_if_pos_is_reachable({x:1,y:7})&&"empty"===check_if_pos_is_reachable({x:2,y:7})&&"empty"===check_if_pos_is_reachable({x:3,y:7})&&possibleMoves.push({x:2,y:7,castle:2})):(Pawns[1][1][1].first_move&&"empty"===check_if_pos_is_reachable({x:1,y:0})&&"empty"===check_if_pos_is_reachable({x:2,y:0})&&"empty"===check_if_pos_is_reachable({x:3,y:0})&&possibleMoves.push({x:2,y:0,castle:0}),Pawns[1][1][1].first_move&&"empty"===check_if_pos_is_reachable({x:5,y:0})&&"empty"===check_if_pos_is_reachable({x:6,y:0})&&possibleMoves.push({x:6,y:0,castle:1}))),possibleMoves}function move_pawn(e,o){for(i=0;i<Pawns[currentPlayer].length;i++)for(j=0;j<Pawns[currentPlayer][i].length;j++){const n=Pawns[currentPlayer][i][j];if(n.id==e.id){grid[e.y][e.x]=null,grid[o.y][o.x]=n,n.x=o.x,n.y=o.y,document.getElementById(e.id).style.gridArea=get_letter(o.y)+(o.x+1),"rook"===n.moveType&&n.first_move&&(n.first_move=!1),"king"===n.moveType&&n.first_move&&(n.first_move=!1),i=Pawns[currentPlayer].length;break}}if(null!=o.kill){for(playerToKill=currentPlayer?0:1,i=0;i<Pawns[playerToKill].length;i++)for(j=0;j<Pawns[playerToKill][i].length;j++){if(Pawns[playerToKill][i][j].id==o.kill.id){document.getElementById(o.kill.id).style.display="none",i=Pawns[playerToKill].length;break}}"king-w"==o.kill.id&&toggleModal({modal:"end",winner:"Black"}),"king-b"==o.kill.id&&toggleModal({modal:"end",winner:"White"})}if("pawn"===e.moveType&&o.y==(currentPlayer?7:0)&&toggleModal({modal:"promotion",pawnToPromote:e}),void 0!==o.castle){let e={};switch(o.castle){case 0:e.i=1,e.j=1,e.k=0,e.x=0,e.y=0,e.x_to_do=3,e.y_to_do=0;break;case 1:e.i=1,e.j=1,e.k=1,e.x=7,e.y=0,e.x_to_do=5,e.y_to_do=0;break;case 2:e.i=0,e.j=1,e.k=0,e.x=0,e.y=7,e.x_to_do=3,e.y_to_do=7;break;case 3:e.i=0,e.j=1,e.k=1,e.x=7,e.y=7,e.x_to_do=5,e.y_to_do=7;break;default:console.error("Switch error")}Pawns[e.i][e.j][e.k].first_move=!1,grid[e.y][e.x]=null,grid[e.y_to_do][e.x_to_do]=Pawns[e.i][e.j][e.k],Pawns[e.i][e.j][e.k].x=e.x_to_do,Pawns[e.i][e.j][e.k].y=e.y_to_do,document.getElementById(Pawns[e.i][e.j][e.k].id).style.gridArea=get_letter(e.y_to_do)+(e.x_to_do+1)}next_turn()}function get_letter(e){return["A","B","C","D","E","F","G","H"][e]}function pawn_promotion(e,o){const n=currentPlayer?0:1;document.getElementById(e.id).innerHTML='<i class="fas fa-chess-'+o+'"></i>';for(let l=0;l<Pawns[n][0].length;l++){const i=Pawns[n][0][l];if(i.id===e.id){i.moveType=o,l=Pawns[n][0].length;break}}}document.onreadystatechange=(()=>{"complete"===document.readyState&&(document.querySelector(".modal").style.display="none",toggleModal({modal:"start"}))});