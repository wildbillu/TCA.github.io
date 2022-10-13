// TC-CAB-ButtonControl.js

function CAB_ForRowLetter_SetButton(iRow, iLetter, cCodeForActivity)
{
    var cAnswerPlayer = CAB_ForRowLetter_GetAnswerPlayer(iRow, iLetter);
    var cStatusPlayer = CAB_ForRowLetter_GetStatusPlayer(iRow, iLetter);
    var sId = '';
    sStatusImage = CAB_ButtonBackgroundImage(cAnswerPlayer, cStatusPlayer, cCodeForActivity)
    sId = CAB_MakeId(iRow, iLetter)
    document.getElementById(sId).style.backgroundImage = sStatusImage;
}

function CAB_ButtonBackgroundImage(cLetter, cStatus, cSelection)
{
    var sStatusImage = '';
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