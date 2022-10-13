// TC-GRB-ButtonControl.js

function GRB_ForRowLetter_SetButton(iRow, iLetter, cCodeForActivity)
{
    if ( iRow == 3 && iLetter == 2) alert('SB:' + iRow + iLetter + cCodeForActivity)
    var cAnswerPlayer = GRB_ForRowLetter_GetAnswerPlayer(iRow, iLetter);
    var cStatusPlayer = GRB_ForRowLetter_GetStatusPlayer(iRow, iLetter);
    var cNumbering    = g_sGridNumbering.charAt(iRow*g_iGridWidth+iLetter);
    var sId = '';
    sStatusImage = GRB_ButtonBackgroundImage(cAnswerPlayer, cStatusPlayer, cNumbering, cCodeForActivity)
    sId = GRB_MakeId(iRow, iLetter)
    document.getElementById(sId).style.backgroundImage = sStatusImage;
    if ( iRow == 3 && iLetter == 2) alert('SB:' + iRow + iLetter + cCodeForActivity + '.Done')
}

function GRB_ButtonBackgroundImage(cLetter, cStatus, cNumber, cSelection)
{
    var sStatusImage = '';
    if ( cLetter == g_TC_cCharacterDenotingBlackSquare )
    {
        sStatusImage  = 'url("images/Button_BlackSquare.png")';
        return sStatusImage;
    }
    sStatusImage  += 'url("images/Button_Frame.png")';
    var cColor = 'N';
    if ( cStatus == g_TC_cCodeMeaning_Corrected )
    {
        if ( sStatusImage != '' )
            sStatusImage += ', '
        sStatusImage += 'url("images/Button_OrangeCorner.png")';
        cColor = 'C';
    }
    else if ( cStatus == g_TC_cCodeMeaning_Incorrect )
    {
        if ( sStatusImage != '' )
            sStatusImage += ', '
        sStatusImage += 'url("images/Button_RedSlash.png")';
    }
    else if ( cStatus == g_TC_cCodeMeaning_Correct )
    {
        cColor = 'C';
    }
    if ( CharValidEntry(cLetter) )
    {
        var sLetterImage = 'images/Letters/L_' + cLetter + '_' + cColor + '.png';
        if ( sStatusImage != '' )
            sStatusImage += ', '
        sStatusImage += 'url("' + sLetterImage + '")';
    }
    if ( cNumber != g_TC_cCharacterDenotingNoNumberSquare )
    {
        var iNumber = parseInt(cNumber) + 1;
        var sNumber = iNumber.toString();
        if ( sNumber.length == 1 )
            sNumber = '0' + sNumber;
            if ( sStatusImage != '' )
            sStatusImage += ', '
        sStatusImage += 'url("images/GridNumbers/No-' + sNumber + '.png")'
    }
    if ( sStatusImage != '' )
        sStatusImage += ', '
    if ( cSelection == 'F')
        sStatusImage += 'url("images/Button_Focus.png")';
    else if ( cSelection == 'A')
        sStatusImage += 'url("images/Button_ActiveRow.png")';
    else
        sStatusImage += 'url("images/Button_Inactive.png")';
    return sStatusImage;
}