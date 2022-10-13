// base defines
var g_sPuzzleDate = '';
var g_sPuzzleName = '';
var g_sPuzzleCreditAuthor = 'By Sketchi Bill';
var g_sPuzzleCreditDate = 'September 26, 2022';
var g_sCookie;
var g_GR_sLastCharacterRejected = '';
var g_GR_bAcross = true;
var g_bDisplayMessages = true;
//
var g_sSketchiToonsClueIntro = 'SketchiToons Clue to Dual Answer';
// these are the values that the actual js uses and are filled in loadPuzzle
var g_sSketchiToonsFilename = '';
var g_sSuccessWindowFilename = '';
var g_sSketchiToonsClueIntro = '';
var g_sSketchiToonsClueItself = '';
var g_sPuzzleTitle = '';
var g_iGridWidth = 4;
var g_iGridHeight = 4;
var g_iClues;
var g_aClues =          [];
var g_aAnswers     =    [];
var g_sAnswers     = '';
var g_aAnswersPlayer        = [];
var g_sAnswersPlayer  = '';
var g_aAnswersStatusPlayer  = [];
var g_sAnswersStatusPlayer;
// now the grid stuff
var g_aGridAnswers       = [];
var g_sGridAnswer;
var g_aGridAnswersPlayer = [];
var g_sGridAnswersPlayer;
var g_aGridStatusPlayer  = [];
var g_sGridStatusPlayer =  '';
var g_GR_aAcrossAnswers = [];
var g_GR_aAcrossAnswersNumber = [];
var g_GR_aDownAnswers = []
var g_GR_aDownAnswersNumber = [];
var g_sGridNumbering;
var g_sDualClueBefore; 
var g_sDualClueMiddle;
var g_sDualClueEnd;
var g_bPuzzleSolved = false;
var g_bGridSolved = false;
var g_bAnswersSolved = false;
var g_sPuzzleVersion = 'October 10, 2022'

function LoadPuzzle()
{
    g_sGridNumbering = sGridNumbering;
    g_sPuzzleDate = sPuzzleDate;
    g_sPuzzleName = sPuzzleName;
    g_sSketchiToonsFilename = sSketchiToonsFilename;
    g_sSuccessWindowFilename = sSuccessWindowFilename;
    g_sSketchiToonsClueItself = sSketchiToonsClueItself;
    g_sSketchiToonsClueIntro  = sSketchiToonsClueIntro;
    g_sPuzzleTitle = sPuzzleTitle;
    g_iGridWidth = iGridWidth;
    g_iGridHeight = iGridHeight;
    // CA Stuff
    g_iClues   = iClueAnswers;
    g_aClues   = sClues.split(g_TC_cGeneralDelimiter);
    g_iAnswers = g_iClues;
    g_aAnswers = sAnswers.split(g_TC_cGeneralDelimiter);
    g_sAnswers              = sAnswers;
    g_aAnswersPlayer        = sAnswersPlayer.split(g_TC_cGeneralDelimiter);
    g_sAnswersPlayer        = sAnswersPlayer;
    g_aAnswersStatusPlayer  = sStatusPlayer.split(g_TC_cGeneralDelimiter);
    g_sAnswersStatusPlayer  = sStatusPlayer;
    if ( g_aClues.length != g_iClues || g_aAnswers.length != g_iClues || g_aAnswersPlayer.length != g_iClues)
        alert('dataProblem.' + g_iClues + g_aClues.Length + g_aAnswers.Length + g_aAnswersPlayer.length);
// GR stuff
    g_sGridAnswers      = sGridAnswers;
    g_sGridAnswersPlayer = sGridAnswersPlayer;
    g_sGridStatusPlayer = sGridStatusPlayer
    for ( iRow = 0; iRow < g_iGridHeight; iRow++ )      
    {
        g_aGridAnswers.      push(sGridAnswers.      substring(iRow*g_iGridWidth, (iRow+1)*g_iGridWidth));
        g_aGridAnswersPlayer.push(sGridAnswersPlayer.substring(iRow*g_iGridWidth, (iRow+1)*g_iGridWidth));
        g_aGridStatusPlayer. push(sGridStatusPlayer. substring(iRow*g_iGridWidth, (iRow+1)*g_iGridWidth));
    }
// now we fill in
     for ( var iRR = 0; iRR < g_iGridHeight; iRR++ )
    { 
        var sNumber = '';
        var sAnswer = '';
        for ( var iLL = 0; iLL < g_iGridWidth; iLL++ )
        {
            var cThisChar = GRB_ForRowLetter_GetAnswer(iRR, iLL);
            if ( cThisChar != g_TC_cCharacterDenotingBlackSquare )
            {
                sAnswer += cThisChar;
                if ( sNumber == '' )
                    sNumber = g_sGridNumbering.charAt(iRR*g_iGridWidth+iLL);
            }
        }
        g_GR_aAcrossAnswers.push(sAnswer);
        g_GR_aAcrossAnswersNumber.push(sNumber);
    }        
    // var g_GR_aDownAnswers = [];
    for ( var iLL = 0; iLL < g_iGridWidth; iLL++ )
    { 
        var sNumber = '';
        var sAnswer = '';
        for ( var iRR = 0; iRR < g_iGridHeight; iRR++ )
        {
            var cThisChar = GRB_ForRowLetter_GetAnswer(iRR, iLL);
            if ( cThisChar != g_TC_cCharacterDenotingBlackSquare )
            {
                sAnswer += cThisChar;
                if ( sNumber == '' )
                    sNumber = g_sGridNumbering.charAt(iRR*g_iGridWidth+iLL);
            }
        }
        g_GR_aDownAnswers.push(sAnswer);
        g_GR_aDownAnswersNumber.push(sNumber);
    }
    g_sDualClueBefore = sDualClueBefore; 
    g_sDualClueMiddle = sDualClueMiddle;
    g_sDualClueEnd = sDualClueEnd;
    g_sPuzzleCreditAuthor = sPuzzleCreditAuthor;
    g_sPuzzleCreditDate = sPuzzleCreditDate;
}
