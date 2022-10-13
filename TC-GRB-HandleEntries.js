// TC-GRB-HandleEntries.js

function GRB_ClearGrid()
{
    for ( var iR = 0; iR < g_iGridHeight; iR++)
    {
        for ( var iL = 0; iL < g_iGridWidth; iL++ )
        {
            if ( !GRB_ForRowAndLetter_isThisSquareABlackSquare(iR, iL) )
            {
                GRB_ForRowLetter_SetAnswerPlayer(g_TC_cCharMeaningNotSet, iR, iL);
                GRB_ForRowLetter_SetStatusPlayer(g_TC_cCodeMeaning_Normal, iR, iL);
                GRB_ForRowLetter_SetButton(iR, iL, g_TC_cCodeMeaning_Inactive);
            }
        }
    }
}

function GRB_ForLetterSetAnswerTo(iLetter, sForceAnswer)
{
// first we set the grid answer player then all else should happen
// we assume we cannot get here unless the right length
    var iForce = 0;
    for ( iRow = 0; iRow < g_iGridHeight; iRow++ )
    {
        if ( !GRB_ForRowAndLetter_isThisSquareABlackSquare(iRow, iLetter) )
        {
            var cForceCharacter = sForceAnswer.charAt(iForce);
            if ( CharValidEntry(cForceCharacter) )
            {
                var sGridAnswerPlayerRow = g_aGridAnswersPlayer[iRow];
                sGridAnswerPlayerRow = replaceAt(sGridAnswerPlayerRow, iLetter, cForceCharacter )
                g_aGridAnswersPlayer[iRow] = sGridAnswerPlayerRow;
            }
            iForce++;
        }
    }
    GRB_SetAnswersPlayer();
    for ( iRR = 0; iRR < g_iGridHeight; iRR++ )
    {
        if ( !GRB_ForRowAndLetter_isThisSquareABlackSquare(iRR, iLetter) )
        {
            GRB_ForRowLetter_SetButton(iRR, iLetter, g_TC_cCodeMeaning_Inactive);
            if ( g_bSettings_CAGR_Answers_CheckRow || g_bSettings_CAGR_Answers_ShowCorrectLetters )
            { // if correct we must mark it correct and set readonly
                GRB_ForRowLetterShowCheckSquare(iRR, iLetter, 'Check');
            }
        }
    }
    return true;
}

function GRB_ForRowSetAnswerTo(iRow, sForceAnswer)
{
    // first we set the grid answer player then all else should happen
    // we assume we cannot get here unless the right length
    var sGridAnswerRow = g_aGridAnswersPlayer[iRow];
    var iForce = 0;
    for ( iCC = 0; iCC < g_iGridWidth; iCC++ )
    {
        if ( !GRB_ForRowAndLetter_isThisSquareABlackSquare(iRow, iCC) )
        {
            var cForceCharacter = sForceAnswer.charAt(iForce);
            if ( CharValidEntry(cForceCharacter) )
            {
                sGridAnswerRow = replaceAt(sGridAnswerRow, iCC, cForceCharacter )
            }
            iForce++;
        }
    }
    g_aGridAnswersPlayer[iRow] = sGridAnswerRow;
    GRB_SetAnswersPlayer();
    for ( iC = 0; iC < g_iGridWidth; iC++ )
    {
        if ( !GRB_ForRowAndLetter_isThisSquareABlackSquare(iRow, iC) )
        {
            GRB_ForRowLetter_SetButton(iRow, iC, g_TC_cCodeMeaning_Inactive);
            if ( g_bSettings_CAGR_Answers_CheckRow || g_bSettings_CAGR_Answers_ShowCorrectLetters )
            { // if correct we mus mark it correct and set readonly
                GRB_ForRowLetterShowCheckSquare(iRow, iC, 'Check');
            }
        }
    }
    return true;
}


function GRB_ShowCheckGrid(sToDo)
{
    var iRowActive = -1;
    var iLetterActive = -1;
    if ( g_GRB_Focus_sId != '' )
    {
        iRowActive    = GRB_RowFromId(g_GRB_Focus_sId);
        iLetterActive = GRB_LetterFromId(g_GRB_Focus_sId);
    }
    for ( var iR = 0; iR < g_iGridHeight; iR++)
    {
        for ( var iL = 0; iL < g_iGridWidth; iL++ )
        {
            var cCodeFocusActiveInactive = g_TC_cCodeMeaning_Inactive;
            if ( g_GRB_bAcross )
            {
                if ( iR == iRowActive )
                {
                    cCodeFocusActiveInactive = g_TC_cCodeMeaning_ActiveRow;
                    if ( iL == iLetterActive )
                        cCodeFocusActiveInactive = g_TC_cCodeMeaning_HasFocus;
                }
            }
            else
            {
                if ( iL == iLetterActive )
                {
                    cCodeFocusActiveInactive = g_TC_cCodeMeaning_ActiveRow;
                    if ( iR == iRowActive )
                        cCodeFocusActiveInactive = g_TC_cCodeMeaning_HasFocus;
                }
            }
            GRB_ForRowLetterShowCheckSquare(iR, iL, sToDo, cCodeFocusActiveInactive)
        }
    }
    return true;
}

function GRB_ShowCheckAnswerActiveRowOrColumn(sToDo)
{
    if ( g_GRB_Focus_sId == '' )
        return false;
    var iRow    = GRB_RowFromId(g_GRB_Focus_sId);
    var iLetter    = GRB_LetterFromId(g_GRB_Focus_sId);
    if ( g_GRB_bAcross )
    {
        for ( var iL = 0; iL < g_iGridWidth; iL++ )
        {
            if ( iL == iLetter )
                GRB_ForRowLetterShowCheckSquare(iRow, iL, sToDo, g_TC_cCodeMeaning_HasFocus)
            else
                GRB_ForRowLetterShowCheckSquare(iRow, iL, sToDo, g_TC_cCodeMeaning_ActiveRow)
        }
    }
    else 
    {
        for ( var iR = 0; iR < g_iGridHeight; iR++ )
        {
            if ( iR == iRow )
                GRB_ForRowLetterShowCheckSquare(iR, iLetter, sToDo, g_TC_cCodeMeaning_HasFocus)
            else
                GRB_ForRowLetterShowCheckSquare(iR, iLetter, sToDo, g_TC_cCodeMeaning_ActiveRow)
        }
    }
    return true;
}

function GRB_ForRowLetterShowCheckSquare(iRow, iLetter, sToDo, cCodeFocusActiveInactive)
{
    if ( GRB_ForRowAndLetter_isThisSquareABlackSquare(iRow, iLetter) )
        return; // actually we should never get here
    var cInitialStatus = GRB_ForRowLetter_GetStatusPlayer(iRow, iLetter);
    if ( cInitialStatus == g_TC_cCodeMeaning_Corrected )
        return; 
    if ( cInitialStatus == g_TC_cCodeMeaning_Correct )
        return;
    var bSetLetter = GRB_ForRowLetter_IsPlayerAnswerSet(iRow, iLetter)
    var cAnswer = GRB_ForRowLetter_GetAnswer(iRow, iLetter);
    var cAnswerPlayerInitial = GRB_ForRowLetter_GetAnswerPlayer(iRow, iLetter);
    if ( sToDo == 'Check' )
    { // if the character is not set and it is Check we do nothing
        if ( !bSetLetter )
            return;
        if ( cAnswer == cAnswerPlayerInitial)
            GRB_ForRowLetter_SetStatusPlayer(g_TC_cCodeMeaning_Correct, iRow, iLetter);
        else
            GRB_ForRowLetter_SetStatusPlayer(g_TC_cCodeMeaning_Incorrect, iRow, iLetter);
    }
    else if ( sToDo == 'Show' )
    { // whatever happens the character is set to the correct letter
        GRB_ForRowLetter_UpdateAnswersPlayer(cAnswer, iRow, iLetter);
        if ( cAnswer == cAnswerPlayerInitial )
            GRB_ForRowLetter_SetStatusPlayer(g_TC_cCodeMeaning_Correct, iRow, iLetter);
        else
            GRB_ForRowLetter_SetStatusPlayer(g_TC_cCodeMeaning_Corrected, iRow, iLetter);
    }
    GRB_ForRowLetter_SetButton(iRow, iLetter, cCodeFocusActiveInactive)
}

function GRB_ShowCheckActiveSquare(sToDo)
{
    if ( g_GRB_Focus_sId == '' )
        return false;
    var iRow    = GRB_RowFromId(g_GRB_Focus_sId);
    var iLetter = GRB_LetterFromId(g_GRB_Focus_sId);
    GRB_ForRowLetterShowCheckSquare(iRow, iLetter, sToDo, g_TC_cCodeMeaning_HasFocus);
    return true;
}
