// TC-CAB-Helpers-Answers-Status.js

function CAB_ForRowLetter_IsPlayerAnswerSet(iRow, iLetter)
{
    var sAnswerPlayer = g_aAnswersPlayer[iRow];
    var cAnswerPlayer = sAnswerPlayer.charAt(iLetter)
    var bValid = CharValidEntry(cAnswerPlayer);
    return bValid
}

function CAB_ForRow_GetLength(iRow)
{
    return g_aAnswers[iRow].length;
}

function CAB_ForRowLetter_IsLastLetter(iRow, iLetter)
{
    var sAnswerPlayer = g_aAnswersPlayer[iRow];
    if ( iLetter == ( sAnswerPlayer.length - 1) )
        return true;
    return false;
}

function CAB_ForRowLetter_SetAnswersPlayer(cLetter, iRow, iLetter)
{
    var sAnswersPlayer = g_aAnswersPlayer[iRow];
    g_aAnswersPlayer[iRow] = replaceAt(sAnswersPlayer, iLetter, cLetter);
    CAB_SetAnswersPlayer();
}

function CAB_ForRowLetter_SetStatusPlayer(cLetter, iRow, iLetter)
{
    var sStatusPlayer = g_aAnswersStatusPlayer[iRow];
    g_aAnswersStatusPlayer[iRow] = replaceAt(sStatusPlayer, iLetter, cLetter);
    CAB_SetStatusPlayer();
}

function CAB_ForRowLetter_GetAnswer(iRow, iLetter)
{
    var sRow = g_aAnswers[iRow];
    var cLetter = sRow.charAt(iLetter)
    return cLetter;
}

function CAB_ForRowLetter_GetAnswerPlayer(iRow, iLetter)
{
    var sRow = g_aAnswersPlayer[iRow];
    var cLetter = sRow.charAt(iLetter)
    return cLetter;
}
 
function CAB_ForRowLetter_GetStatusPlayer(iRow, iLetter)
{
    return g_aAnswersStatusPlayer[iRow].charAt(iLetter);
}

function CAB_ForRowLetter_UpdateAnswersPlayer(cAnswer, iRow, iLetter)
{
    var sPlayerAnswer = g_aAnswersPlayer[iRow];
    var sNew = replaceAt(sPlayerAnswer, iLetter, cAnswer);
    g_aAnswersPlayer[iRow] = sNew;
    CAB_SetAnswersPlayer();
}

function CAB_SetAnswersPlayer()
{
    g_sAnswersPlayer = g_aAnswersPlayer.join('');
}

function CAB_SetStatusPlayer()
{
    g_sAnswersStatusPlayer = g_aAnswersStatusPlayer.join('');
}
