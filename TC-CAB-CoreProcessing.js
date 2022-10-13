// TC-CAB-CoreProcessing.js
function CAB_Set_RowBackgroundColors()
{
    var iRow = -1;
    if ( g_CAB_Focus_sId != '' )
    {
        iRow = CAB_RowFromId(g_CAB_Focus_sId);
    }
// deal with dual row    
    var sDualRowClass_CA01CI = 'CAB_Row_DualClue_S CAB_Color_InActive'
    var sDualRowClass_CA01C = 'CAB_Row_DualClue CAB_Color_InActive'
    var sDualRowClass_CA_01_R = 'CAB_Row_DualClue CAB_Color_InActive'
    if ( iRow == 0 || iRow == 1 )
    {
        sDualRowClass_CA01CI = 'CAB_Row_DualClue_S CAB_Color_Active'
        sDualRowClass_CA01C = 'CAB_Row_DualClue CAB_Color_Active'
        sDualRowClass_CA_01_R = 'CAB_Row_DualClue CAB_Color_Active'
    }
    document.getElementById('CA01CI').className = sDualRowClass_CA01CI;
    document.getElementById('CA01C').className = sDualRowClass_CA01C;
    document.getElementById('CA_01_R').className = sDualRowClass_CA_01_R;
    for ( iR = 2; iR < g_iClues; iR++)
    {
        var sId = 'CA_' + iR + '_R';
        var sClassRow = 'CAB_Row_Base CAB_Color_InActive';
        if ( iR == iRow )
            sClassRow = 'CAB_Row_Base CAB_Color_Active';
        document.getElementById(sId).className = sClassRow;
    }
}

function CAB_MoveFocus(iNewRow, iNewLetter)
{
    if ( iNewRow > iClueAnswers -1 || iNewRow < 0 )
    {
        setline('Invalid Row:'+ iNewRow + 'iNewLetter:' + iNewLetter);
        iNewRow = 0;
    }
    var sNextBox = CAB_MakeId(iNewRow, iNewLetter);
	document.getElementById(sNextBox).focus();
}

function CAB_SetFocusToNext(iRow, iLetter)
{
    var iLength = CAB_ForRow_GetLength(iRow);
    var bLastLetter = CAB_ForRowLetter_IsLastLetter(iRow, iLetter);
    if ( !bLastLetter && g_bSettings_CAGR_Navigation_WithinWord_SkipFilledSquares )
    {
        for ( iL = iLetter+1; iL < iLength; iL++)
        {
            if ( !CAB_ForRowLetter_IsPlayerAnswerSet(iRow, iL) )
            {
                CAB_MoveFocus(iRow, iL);
                return;
            }
            iLetter = iL;
        }
    }
    if ( bLastLetter && g_bSettings_CAGR_Navigation_EndOfWord_JumpBackToEmptySquare )
    { 
        for ( iL = 0; iL < iLength; iL++)
        {
            if ( !CAB_ForRowLetter_IsPlayerAnswerSet(iRow, iL) )
            {
                CAB_MoveFocus(iRow, iL);
                return;
            }
        }
    }
    if ( bLastLetter && !g_bSettings_CAGR_Navigation_EndOfWord_JumpToNextClue )
    {
        return;
    }
    var iNewRow = iRow;
	var iNewLetter = iLetter;
	if ( iLetter < iLength-1 )
	{
		iNewLetter = iNewLetter + 1;
    }
    else
    {
        iNewLetter = 0;
        iNewRow++;
    }
	if ( iNewRow > g_iAnswers - 1 )
    {
        iNewRow = 0;
        iNewLetter = 0;
    }
    CAB_MoveFocus(iNewRow, iNewLetter)
}

function CAB_ForRowLetter_DoItAll(cAnswerPlayer, iRow, iLetter)
{
    var cInitialStatus = CAB_ForRowLetter_GetStatusPlayer(iRow, iLetter);
    if ( cInitialStatus == g_TC_cCodeMeaning_Correct ) 
        return; // if correct already don't allow change and nothing else to do
    CAB_ForRowLetter_UpdateAnswersPlayer(cAnswerPlayer, iRow, iLetter);
//    
    if ( cInitialStatus == g_TC_cCodeMeaning_Incorrect )
    { // since a letter was typed we no longer know it is incorrect so set back to Normal
        CAB_ForRowLetter_SetStatusPlayer(g_TC_cCodeMeaning_Normal, iRow, iLetter);
    }
    if ( g_bSettings_CAGR_Answers_ShowCorrectLetters )
    {
        CAB_ForRowLetterShowCheckSquare(iRow, iLetter, "Check", g_TC_cCodeMeaning_HasFocus)
        Status_Check();
        StoreCookie_Puzzle()
    }
    if ( g_bSettings_CAGR_Answers_CheckRow )
    {
        var iLength = CAB_ForRow_GetLength(iRow);
        if ( iLetter == iLength - 1)
        {
            CAB_ShowCheckAnswerActiveRow('Check');
            Status_Check();
            StoreCookie_Puzzle();
        }
    }
// now we need to deal with the the entire row or letter to get the images right
    CAB_SetRowToActive(iRow, iLetter);
}

function CAB_onmousedown(iRow, iLetter)
{
    return true;
}

function CAB_onkeypress(event)
{
    var ekey = event.key;
    if ( ( ekey >= 'a' && ekey <= 'z' ) || ( ekey >= 'A' && ekey <= 'Z') || ekey == ' ')
        return true; // so character will be processed
    if ( event.code == 8 || event.code == 46 )
        return false;
    setline('CAB.NotHandled:' + ekey + '-Code:' + event.code);
    return false;
}

function CAB_onkeydown(key, iRow, iLetter)
{
    if ( key.startsWith('Backspace') )
    {
        key = ' ';
    }
    var letters = /^[a-zA-Z ]$/;
    if ( key.match(letters) ) 
    {
        var sUpper = key.toUpperCase();
        CAB_ForRowLetter_DoItAll(sUpper, iRow, iLetter);
        CAB_SetFocusToNext(iRow, iLetter);
        return true;
    }
    // trap the arrow keys
    if ( CAB_HandleArrowKeys(key, iRow, iLetter) )
        return;
    setline('keydown:' + key + 'notprocessed');
    return false;
}

function CAB_onfocus(elem)
{
    var sThisId = elem.id;
    if ( g_GRB_Focus_sId != '')        
        GRB_FocusLostSetActiveToInActive();
    var iThisRow        = CAB_RowFromId(sThisId);
    var iThisCharacter  = CAB_LetterFromId(sThisId);
    CAB_SetRowToActive(iThisRow, iThisCharacter);
    if ( g_CAB_Focus_sId != '' )
    {    
        var iOldRow = CAB_RowFromId(g_CAB_Focus_sId);
        if ( iThisRow != iOldRow )
        { // need to change the old row to inactive
            if ( ( iThisRow == 0 && iOldRow == 1 ) || ( iThisRow == 1 && iOldRow == 0 ) )
            {
                CAB_SetRowToInActive(iOldRow);
            }
            else
                CAB_SetRowToInActive(iOldRow);
        }
    }
    g_CAB_Focus_sId = sThisId;
    CAB_Set_RowBackgroundColors()
    return true;
}

function CAB_HandleArrowKeys(key, iRow, iLetter)
{
    if ( !key.startsWith('Arrow') )
        return false;
    if ( key.match('Up') )
    {
        var iNewRow = iRow - 1;
        if ( iNewRow < 0 )
            iNewRow = g_iClues - 1;
        var iNewLetter = iLetter;
        var iLengthOfNewRow = CAM_ForRow_GetLength(iNewRow);
        if ( iNewLetter > iLengthOfNewRow - 1 )
             iNewLetter = iLengthOfNewRow - 1;
             CAB_MoveFocus(iNewRow, iNewLetter);
        return true;
    }
    if ( key.match('Down') )
    {
        var iNewRow = iRow + 1;
        if ( iNewRow > g_iClues - 1 )
            iNewRow = 0;
        var iLengthNewRow = CAM_ForRow_GetLength(iNewRow);
        var iNewLetter = iLetter;
        if ( iNewLetter > iLengthNewRow - 1)
            iNewLetter = iLengthNewRow - 1;
        CAB_MoveFocus(iNewRow, iNewLetter);
        return true;
    }
    if ( key.match('Right') )
    {
        var sNext = CAM_RowLetterNext(iRow, iLetter);
        CAB_MoveFocus(parseInt(sNext.charAt(0)), parseInt(sNext.charAt(1)));
        return true;
    }
    var sNext = CAM_RowLetterPrevious(iRow, iLetter);
    CAB_MoveFocus(parseInt(sNext.charAt(0)), parseInt(sNext.charAt(1)));
    return true;
}

