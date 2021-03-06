/**
 * Created by lys.
 * User: Liu Xinyi
 * Date: 14-10-21
 * Time: 下午5:47
 * Write the description in this section.
 */
module.exports = MainServer;
var BOK = require('../../common/bok/BOK'),
    BaseLobbyServer = require('../../common/net/ws/BaseLobbyServer'),
    GameCon = require('../connection/GameCon'),
    Game2048 = require('../game/Game2048'),
    Game2048Con = require('../connection/Game2048Con'),
    WaffleGame = require('../game/WaffleWord'),
    WaffleWordCon = require('../connection/WaffleWordCon'),
    DouDiZhuGame = require('../game/DouDiZhu'),
    DouDiZhuCon = require('../connection/DouDiZhuCon'),
    QuizUpGame = require('../game/QuizUp'),
    GameLobby = require('../lobby/GameLobby'),
    QuizLobby = require('../lobby/QuizLobby'),
    QuizQuestionDao = require('../dao/QuizQuestionDao'),
    QuizHistoryDao = require('../dao/QuizHistoryDao');
var mongo = require('mongodb'),
    db = require('monk')('localhost:27017/test');
var questionDao = new QuizQuestionDao(db);
var historyDao = new QuizHistoryDao(db);

BOK.inherits(MainServer, BaseLobbyServer);
/**
 * @param {socket.io} io
 * */
function MainServer(io) {
    BaseLobbyServer.call(this, io);

    this.regLobby('2048', new GameLobby('2048Lobby', Game2048, Game2048Con));
    this.regLobby('waffle', new GameLobby('WaffleLobby', WaffleGame, WaffleWordCon));
    this.regLobby('doudizhu', new GameLobby('DouDiZhuLobby', DouDiZhuGame, DouDiZhuCon));
    this.regLobby('quizup', new QuizLobby('QuizUpLobby', QuizUpGame, {questionDao: questionDao, historyDao: historyDao}));

}
