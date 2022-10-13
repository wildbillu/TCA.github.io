//TC-GRB-MoveFocus.js

function GRB_ChangeDirection()
{
    if ( g_GRB_Focus_sId == '')
    {
        g_GRB_bAcross = !g_GRB_bAcross;
        if ( g_CAB_Focus_sId != '')
            document.getElementById(g_CAB_Focus_sId).focus();
        return;
    }
// so we know GRB has focus and there fore CA does not    
    var iRow = GRB_RowFromId(g_GRB_Focus_sId);
    var iLetter = GRB_LetterFromId(g_GRB_Focus_sId);
    GRB_onmousedown(iRow, iLetter);
    document.getElementById(g_GRB_Focus_sId).focus()
}

function GRB_MoveFocus(iNewRow, iNewLetter)
{
    var sNextBoxID = GRB_MakeId(iNewRow, iNewLetter);
	document.getElementById(sNextBoxID).focus();
}

function GRB_SetFocusToNext(iRow, iLetter)
{
    var iNewRow = iRow;
    var iNewLetter = iLetter;
    if ( g_GRB_bAcross )
    {
        var bLastLetterAcross = GRB_ForRowLetter_Across_IsLastLetter(iRow, iLetter);
        if ( !bLastLetterAcross && g_bSettings_CAGR_Navigation_WithinWord_SkipFilledSquares )
        {
            for ( iL = iLetter+1; iL < g_iGridWidth; iL++)
            {
                var bPlayerSet = GRB_ForRowLetter_IsPlayerAnswerSet(iRow, iL);
                var bBlackSquare = GRB_ForRowAndLetter_isThisSquareABlackSquare(iRow, iL);
                if ( !bPlayerSet && !bBlackSquare )
                {
                    GRB_MoveFocus(iRow, iL);
                    return;
                }
                iLetter = iL;
            }
        }
        bLastLetterAcross = GRB_ForRowLetter_Across_IsLastLetter(iRow, iLetter);
        if ( bLastLetterAcross && g_bSettings_CAGR_Navigation_EndOfWord_JumpBackToEmptySquare )
        { 
            for ( iL = 0; iL < iLetter; iL++)
            {
                if ( !GRB_ForRowLetter_IsPlayerAnswerSet(iRow, iL)  && !GRB_ForRowAndLetter_isThisSquareABlackSquare(iRow, iL))
                {
                    GRB_MoveFocus(iRow, iL);
                    return;
                }
            }
        }
        bLastLetterAcross = GRB_ForRowLetter_Across_IsLastLetter(iRow, iLetter);
        if ( bLastLetterAcross && !g_bSettings_CAGR_Navigation_EndOfWord_JumpToNextClue )
        {
            return;
        }
        if ( iLetter < g_iGridWidth - 1 )
        {
            iNewLetter = iNewLetter + 1;
        }
        else
        {
            iNewLetter = 0;
            iNewRow++;
        }
        if ( iNewRow > g_iGridHeight - 1 )
        {
            iNewRow = 0;
            iNewLetter = 0;
        }
    }
    else
    {
    // starts the down stuff
        var bLastLetterDown = GRB_ForRowLetter_Down_IsLastLetter(iRow, iLetter);
    if ( !bLastLetterDown && g_bSettings_CAGR_Navigation_WithinWord_SkipFilledSquares )
        {
            for ( iR = iRow+1; iR < g_iGridHeight; iR++)
            {
                var bPlayerSet = GRB_ForRowLetter_IsPlayerAnswerSet(iR, iLetter);
                var bBlackSquare = GRB_ForRowAndLetter_isThisSquareABlackSquare(iR, iLetter);
                if ( !bPlayerSet && !bBlackSquare )
                {
                    GRB_MoveFocus(iR, iLetter);
                    return;
                }
                iRow = iR;
            }
        }
        bLastLetterDown = GRB_ForRowLetter_Down_IsLastLetter(iRow, iLetter);
        if ( bLastLetterDown && g_bSettings_CAGR_Navigation_EndOfWord_JumpBackToEmptySquare )
        { 
            for ( iR = 0; iR < g_iGridHeight-1; iR++)
            {
                var bBlackSquare = GRB_ForRowAndLetter_isThisSquareABlackSquare(iR, iLetter);
                if ( !GRB_ForRowLetter_IsPlayerAnswerSet(iR, iLetter) && !bBlackSquare )
                {
                    GRB_MoveFocus(iR, iLetter);
                    return;
                }
            }
        }
        bLastLetterDown = GRB_ForRowLetter_Down_IsLastLetter(iRow, iLetter);
        if ( bLastLetterDown && !g_bSettings_CAGR_Navigation_EndOfWord_JumpToNextClue )
        {
            return;
        }
        var iNewRow = iRow;
        var iNewLetter = iLetter;
        if ( iRow == g_iGridHeight - 1 && iLetter == g_iGridWidth - 1)
        {
            iNewRow = 0;
            iNewLetter = 0;
        }
        else
        {
            if ( iRow < g_iGridHeight - 1)
            {
                iNewRow = iRow + 1;
                iNewLetter = iLetter;
            }
            else
            {
                iNewRow = 0;
                iNewLetter = iNewLetter + 1;
            }
        }
    }
    if ( GRB_ForRowAndLetter_isThisSquareABlackSquare(iNewRow, iNewLetter) )
    {
        GRB_SetFocusToNext(iNewRow, iNewLetter);
        return;
    }
    GRB_MoveFocus(iNewRow, iNewLetter)
}