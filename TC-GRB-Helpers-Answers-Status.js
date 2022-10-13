// TC-GR-Helpers-Answers-Status.js

function GRB_ForRowLetter_SetAnswerPlayer(cLetter, iRow, iLetter)
{
    var cAnswerPlayer = g_aGridAnswersPlayer[iRow];
    g_aGridAnswersPlayer[iRow] = replaceAt(cAnswerPlayer, iLetter, cLetter);
    GRB_SetAnswersPlayer();
}

function GRB_ForRowLetter_SetStatusPlayer(cLetter, iRow, iLetter)
{
    var cStatusPlayer = g_aGridStatusPlayer[iRow];
    g_aGridStatusPlayer[iRow] = replaceAt(cStatusPlayer, iLetter, cLetter);
    GRB_SetStatusPlayer();
}

function GRB_ForRowLetter_GetAnswer(iRow, iLetter)
{
    var sRow = g_aGridAnswers[iRow];
    var cLetter = sRow.charAt(iLetter)
    return cLetter;
}

function GRB_SetAnswersPlayer()
{
    g_sGridAnswersPlayer = g_aGridAnswersPlayer.join('');
}

function GRB_SetStatusPlayer()
{
    g_sGridStatusPlayer = g_aGridStatusPlayer.join('');
}

function GRB_ForRowLetter_GetAnswerPlayer(iRow, iLetter)
{
    var sRow = g_aGridAnswersPlayer[iRow];
    var cLetter = sRow.charAt(iLetter)
    return cLetter;
}

function GRB_ForRowLetter_GetStatusPlayer(iRow, iLetter)
{
    return g_aGridStatusPlayer[iRow].charAt(iLetter);
}

function GRB_ForRowLetter_UpdateAnswersPlayer(cAnswer, iRow, iLetter)
{
    var sPlayerAnswer = g_aGridAnswersPlayer[iRow];
    var sNew = replaceAt(sPlayerAnswer, iLetter, cAnswer);
    g_aGridAnswersPlayer[iRow] = sNew;
    GRB_SetAnswersPlayer();
}


function GRB_ForRowLetter_Across_IsLastLetter(iRow, iLetter)
{ // cannot use the 'answers' because they don't have the . and we count location
    if ( iLetter == g_iGridWidth - 1 )
        return true;
    for ( iL = iLetter+1; iL < g_iGridWidth; iL++ )        
    {
        if ( !GRB_ForRowAndLetter_isThisSquareABlackSquare(iRow, iL) )
            return false;    
    }
    return true;
}

function GRB_ForRowLetter_Down_IsLastLetter(iRow, iLetter)
{
    if ( iRow == g_iGridHeight - 1 )
        return true;
    for ( iR = iRow+1; iR < g_iGridHeight; iR++ )        
    {
        if ( !GRB_ForRowAndLetter_isThisSquareABlackSquare(iR, iLetter) )
            return false;    
    }
    return true;
}

function GRB_ForRowLetter_IsPlayerAnswerSet(iRow, iLetter)
{
    var cAnswerPlayer = g_sGridAnswersPlayer.charAt(iRow*(g_iGridWidth)+iLetter);
    var bValid = CharValidEntry(cAnswerPlayer);
    return bValid
}
