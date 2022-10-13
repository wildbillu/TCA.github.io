// TC-GRB-Basic.js

function GRB_FocusLostSetActiveToInActive()
{
    if ( g_GRB_Focus_sId == '' )
        return;
    if ( g_GRB_bAcross )
    {
        var iRow = GRB_RowFromId(g_GRB_Focus_sId);
        GRB_SetRowToInActive(iRow);
    }
    else
    {
        var iLetter = GRB_LetterFromId(g_GRB_Focus_sId);
        GRB_SetColumnToInActive(iLetter);
    }
    g_GRB_Focus_sId = '';
}

function GRB_SetColumnToInActive(iLetter)
{
    for (var iR = 0; iR < g_iGridWidth; iR++ )
    {
        GRB_ForRowLetter_SetButton(iR, iLetter, g_TC_cCodeMeaning_Inactive)
    }
}

function GRB_SetRowToInActive(iRow)
{
    for (var iL = 0; iL < g_iGridWidth; iL++ )
    {
        GRB_ForRowLetter_SetButton(iRow, iL, g_TC_cCodeMeaning_Inactive)
    }
}

function GRB_SetRowToActive(iRow, iActiveLetter)
{
    for (var iL = 0; iL < g_iGridWidth; iL++ )
    {
        if ( iL == iActiveLetter)
            GRB_ForRowLetter_SetButton(iRow, iL, g_TC_cCodeMeaning_HasFocus)
        else
            GRB_ForRowLetter_SetButton(iRow, iL, g_TC_cCodeMeaning_ActiveRow)
    }
}
function GRB_SetColumnToActive(iActiveRow, iLetter)
{
    for (var iR = 0; iR < g_iGridWidth; iR++ )
    {
        if ( iR == iActiveRow )
            GRB_ForRowLetter_SetButton(iR, iLetter, g_TC_cCodeMeaning_HasFocus)
        else
            GRB_ForRowLetter_SetButton(iR, iLetter, g_TC_cCodeMeaning_ActiveRow)
    }
}

function GRB_ForRowAndLetter_isThisSquareABlackSquare(iRow, iLetter)
{
    var cAnswerPlayer = GRB_ForRowLetter_GetAnswer(iRow, iLetter);
    if ( cAnswerPlayer == g_TC_cCharacterDenotingBlackSquare )
        return true;
    return false;
}

function GRB_MakeId(iRow, iLetter)
{
    var s = 'GRB_' + iRow + '_' + iLetter   
    return s;
}

function GRB_LetterFromId(sid)
{
    return parseInt(sid.charAt(6));
}

function GRB_RowFromId(sid)
{
    return parseInt(sid.charAt(4));
}

function GRB_MakeHTMLId(iRow, iLetter)
{
    var s = 'Id="' + GRB_MakeId(iRow, iLetter) + '" ';
    return s;
}
