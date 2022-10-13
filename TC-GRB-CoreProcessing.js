// TC-GRB-CoreProcessing.js



function GRB_ForRowLetter_DoItAll(cAnswerPlayer, iRow, iLetter)
{
    var cInitialStatus = GRB_ForRowLetter_GetStatusPlayer(iRow, iLetter);
    if ( cInitialStatus == g_TC_cCodeMeaning_Correct ) 
        return; // if correct already don't allow change and nothing else to do
    GRB_ForRowLetter_UpdateAnswersPlayer(cAnswerPlayer, iRow, iLetter);
//    
    if ( cInitialStatus == g_TC_cCodeMeaning_Incorrect )
    { // since a letter was typed we no longer know it is incorrect so set back to Normal
        GRB_ForRowLetter_SetStatusPlayer(g_TC_cCodeMeaning_Normal, iRow, iLetter);
    }
    if ( g_bSettings_CAGR_Answers_ShowCorrectLetters )
    {
        GRB_ForRowLetterShowCheckSquare(iRow, iLetter, "Check", g_TC_cCodeMeaning_HasFocus)
        Status_Check();
        StoreCookie_Puzzle()
    }
    if ( g_bSettings_CAGR_Answers_CheckRow )
    {
        GRB_ShowCheckAnswerActiveRowOrColumn('Check');
        Status_Check();
        StoreCookie_Puzzle()
    }
// now we need to deal with the the entire row or letter to get the images right
    if ( g_GRB_bAcross )
        GRB_SetRowToActive(iRow, iLetter);
    else
        GRB_SetColumnToActive(iRow, iLetter);
}

function GRB_onmousedown(iRow, iLetter)
{
    var sMouseDownLocation = GRB_MakeId(iRow, iLetter)
    if ( sMouseDownLocation == g_GRB_Focus_sId )
    {
        if ( g_GRB_bAcross )
        {
            g_GRB_bAcross = false;
            GRB_SetRowToInActive(iRow);
            GRB_SetColumnToActive(iRow, iLetter);
        }
        else
        {
            g_GRB_bAcross = true;
            GRB_SetColumnToInActive(iLetter);
            GRB_SetRowToActive(iRow, iLetter);
        }
        return false;
    }
    return true;
}

function GRB_onkeypress(event)
{
    var ekey = event.key;
    if ( ( ekey >= 'a' && ekey <= 'z' ) || ( ekey >= 'A' && ekey <= 'Z') || ekey == ' ')
        return true; // so character will be processed
    g_GR_sLastCharacterRejected = ekey;
    if ( event.code == 8 || event.code == 46 )
        return false;
    setline('GRB.NotHandled:' + ekey + '-Code:' + event.code);
    return false;
}

function GRB_onkeydown(key, iRow, iLetter)
{
    if ( key.startsWith('Backspace') )
    {
        key = ' ';
    }
    var letters = /^[a-zA-Z ]$/;
    if ( key.match(letters) ) 
    {
        var sUpper = key.toUpperCase();
        GRB_ForRowLetter_DoItAll(sUpper, iRow, iLetter);
        GRB_SetFocusToNext(iRow, iLetter);
        return true;
    }
    // trap the arrow keys
    if ( key.startsWith('Arrow') )
    {
        if ( key.match('Up') )
        {
            var sNext = GR_GoUpToNext(iRow, iLetter);
            GRB_MoveFocus(parseInt(sNext.charAt(0)), parseInt(sNext.charAt(1)));
            return true;
        }
        else if ( key.match('Down') )
        {
            var sNext = GR_GoDownToNext(iRow, iLetter);
            GRB_MoveFocus(parseInt(sNext.charAt(0)), parseInt(sNext.charAt(1)));
            return true;
        }
        else if ( key.match('Right') )
        {
            var sNext = GR_GoRightToNext(iRow, iLetter);
// unless the current row is 0 we want to move the focus to the previous row with the same letter
            GRB_MoveFocus(parseInt(sNext.charAt(0)), parseInt(sNext.charAt(1)));
            return true;
        }
        else 
        { // must be left
            var sNext = GR_GoLeftToNext(iRow, iLetter);
// unless the current row is 0 we want to move the focus to the previous row with the same letter
            GRB_MoveFocus(parseInt(sNext.charAt(0)), parseInt(sNext.charAt(1)));
            return true;
        }
    }
    else
    {
        setline('keydown:' + key + 'notprocessed');
    }
    var sFixThisBox = GRB_MakeId(iRow, iLetter);
    document.getElementById(sFixThisBox).focus();
    document.getElementById(sFixThisBox).setSelectionRange(0,1);
 
    return false;
}

function GRB_onfocus(elem)
{
    var sThisId = elem.id;
    if ( g_CAB_Focus_sId != '')        
    {
        CAB_FocusLostSetActiveToInActive();
    }
    var iThisRow        = GRB_RowFromId(sThisId);
    var iThisCharacter  = GRB_LetterFromId(sThisId);
    if ( GRB_ForRowAndLetter_isThisSquareABlackSquare(iThisRow, iThisCharacter) )
    {
        setline('noBSFocus');
        return;
    }
    // deal with changes to the new focus
    if ( g_GRB_bAcross )
        GRB_SetRowToActive(iThisRow, iThisCharacter);
    else       
        GRB_SetColumnToActive(iThisRow, iThisCharacter);
    if ( g_GRB_Focus_sId != '' )
    {    
        var iOldRow        = GRB_RowFromId(g_GRB_Focus_sId);
        var iOldCharacter  = GRB_LetterFromId(g_GRB_Focus_sId);        
        if ( g_GRB_bAcross )
        { // fixing to oldrows
            if ( iThisRow != iOldRow)
                GRB_SetRowToInActive(iOldRow)
        }
        else
        { // fixing to oldcolumns
            if ( iThisCharacter != iOldCharacter)
                GRB_SetColumnToInActive(iOldCharacter);
        }
    }
    g_GRB_Focus_sId = sThisId;
    return true;
}


