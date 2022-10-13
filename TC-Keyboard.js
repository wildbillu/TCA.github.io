// TC-keyboard.js
// 
function CAB_HandleKeyboardPress(keypressed)
{
    if ( g_CAB_Focus_sId == "")
        return;
    iRow = CAB_RowFromId(g_CAB_Focus_sId);
    iLetter = CAB_LetterFromId(g_CAB_Focus_sId);
    var cInitialStatus = CAB_ForRowLetter_GetStatusPlayer(iRow, iLetter);
    if ( cInitialStatus == g_TC_cCodeMeaning_Correct ) 
    {
        CAB_SetFocusToNext(iRow, iLetter);
        return;
    }
    var sCC = String.fromCharCode(8);
    if ( keypressed == sCC )
        sToSet = ' ';
    CAB_onkeydown(keypressed, iRow, iLetter);
}

function GRB_HandleKeyboardPress(keypressed)
{
    if ( g_GRB_Focus_sId == "")
        return;
    iRow = GRB_RowFromId(g_GRB_Focus_sId);
    iLetter = GRB_LetterFromId(g_GRB_Focus_sId);
    var cInitialStatus = GRB_ForRowLetter_GetStatusPlayer(iRow, iLetter);
    if ( cInitialStatus == g_TC_cCodeMeaning_Correct ) 
    {
        GRB_SetFocusToNext(iRow, iLetter);
        return;
    }
    var sCC = String.fromCharCode(8);
    if ( keypressed == sCC )
        sToSet = ' ';
    GRB_onkeydown(keypressed, iRow, iLetter);
}

function HandleKeyboardPress(sLetter)
{
    GRB_HandleKeyboardPress(sLetter);
    CAB_HandleKeyboardPress(sLetter);
}

function KB_SetButtonRow(sLetters)
{
    var sButtonRow = '<TABLE><TR><TD>';
    var iLetters = sLetters.length;
    for ( iLetter = 0; iLetter < iLetters; iLetter++ )
    {
        sButtonRow += KB_Set_TDButton(sLetters.charAt(iLetter));
    }
    sButtonRow += '</TD></TR></TABLE>'
    return sButtonRow;
}

function KB_Set_TDButton(sLetter)
{
    var sText = sLetter;
    var sClass = '"KB_Button KB_Button_Letter"';
    var sCC = String.fromCharCode(8);
    if ( sLetter == sCC )
    {
        sClass = '"KB_Button KB_Button_Backspace"'
        sText = 'BKS';
    }
    var sButton = '<TD><BUTTON class=' + sClass + ' value=\'' + sLetter + '\' onclick="HandleKeyboardPress(\'';
    sButton += sLetter +'\');">';
    sButton += sText;
    sButton += '</TD>';
    return sButton;
}

function KB_Set_innerHTML()
{
    var sInner = '<TABLE align=center>';
// first row has letters QWERTYUIOP
    sInner += '<TR align=center><TD>';
    sInner += KB_SetButtonRow('QWERTYUIOP');
    sInner += '</TD></TR>';    
// secondrow has ASDFGHJKL
    sInner += '<TR align=center><TD>';
    sInner += KB_SetButtonRow('ASDFGHJKL');
    sInner += '</TD></TR>';    
// third has ZXCVBNM and backspace
    sInner += '<TR align=center><TD>';
    var sThisRow = 'ZXCVBNM';
    var sCC = String.fromCharCode(8);
    sThisRow += sCC;
    sInner += KB_SetButtonRow(sThisRow);
    sInner += '</TD></TR>';    
    sInner += '</TR>';    
    sInner += '</TABLE>';
    document.getElementById('KB').innerHTML = sInner;
}

