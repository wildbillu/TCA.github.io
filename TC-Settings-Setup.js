// TC-Settings-Setup.js
//
var g_bButton_Settings_Active = false;

function MakeCheckBox(bChecked, sidRaw, stitle )
{
    var sId = 'Id="' + sidRaw + '"';
    var sIdA = 'Id="' + sidRaw + 'A"';
    var sIdB = 'Id="' + sidRaw + 'B"';
    var sChecked = ''
    if ( bChecked )
        sChecked = ' checked ';
    var sCheckBox = ''
    sCheckBox += '<TR align=center><TD>'
    sCheckBox += ' <TABLE class="Settings_TableBorder" ' + sIdA + ' width="90%"><TR>';
    sCheckBox += '  <TD width="95%" '+ sIdB + ' class="Settings_CheckBoxRowTitle">' + stitle + '</TD>';
    sCheckBox += '  <TD width="5%" class="Settings_CheckBox"><INPUT type="checkbox" ' + sChecked +' class="Settings_CheckBox"' + sId + ' onclick="Button_Settings_GetAllAndSaveCookie();"></TD>';
    sCheckBox += ' </TR></TABLE>';
    sCheckBox += '</TD></TR>'
    return sCheckBox;
}

function MakeSubTitleRow(sSubTitle, sIdRaw)
{
    var sTitleRow = '';
    var sId = 'Id="' + sIdRaw + '"';
    var sIdA = 'Id="' + sIdRaw + 'A"';
    var sIdB = 'Id="' + sIdRaw + 'B"';
    sTitleRow += '      <TR align=center ' + sIdA +'><TD>'
    sTitleRow += '          <TABLE ' + sIdB + ' class="Settings_TableBorder Settings_Center" width="90%"><TR ' + sId + 'Z class="Settings_Center" align=center > <TD width="100%" ' + sId + 'A class="Settings_SubtitleRow">' + sSubTitle + '</TD></TR></TABLE>';
    sTitleRow += '      </TD></TR>'
    return sTitleRow;
}

function Load_Button_Settings_Popup()
{
    var sPopupWindow = '';
    sPopupWindow += '<div width="100%" id="Button_Settings_Div" class="Settings_Popup Settings_BackgroundColor">';
    sPopupWindow += '<span width="100%" class="Settings_Popup_Text Settings_BackgroundColor" Id="Button_Settings">';
    sPopupWindow += '<div class="Settings_DivBorder" Id="Settings_A">';     
    sPopupWindow += '<TABLE class="Settings_TableBorder" Id="Settings_B" width="100%">'
    sPopupWindow += '<TR class="Settings_CloseBoxRow" Id="Settings_F" ><TD>'
    sPopupWindow += '<TABLE Id="Settings_I" width="100%"><TR><TD width="95%" Id="Settings_G" class="Settings_CloseBoxRow">Settings</TD><TD width="5%"><BUTTON Id="Settings_CloseBox" class="Settings_CloseBox" onclick="Button_Settings_Toggle();">Done</TD></TR></TABLE>';
    sPopupWindow += '</TD></TR>';
    sPopupWindow += MakeSubTitleRow('Check and Show Correct Items', 'Settings_STA')
    sPopupWindow += MakeCheckBox(g_bSettings_CAGR_Answers_CheckRow, 'Settings_CAGR_Answers_CheckRow', 'Check each answer and mark when correct');
    sPopupWindow += MakeCheckBox(g_bSettings_CAGR_Answers_ShowCorrectLetters, 'Settings_CAGR_Answers_ShowCorrectLetters', 'Mark each square when correct');
    sPopupWindow += MakeSubTitleRow('Actions On Add Letter', 'Settings_STB')
    sPopupWindow += MakeCheckBox(g_bSettings_CAGR_Navigation_WithinWord_SkipFilledSquares, 'Settings_CAGR_Navigation_WithinWord_SkipFilledSquares', 'Skip Filled Squares')
    sPopupWindow += MakeCheckBox(g_bSettings_CAGR_Navigation_EndOfWord_JumpBackToEmptySquare, 'Settings_CAGR_Navigation_EndOfWord_JumpBackToEmptySquare', 'Jump to empty square at end of word')
    sPopupWindow += MakeCheckBox(g_bSettings_CAGR_Navigation_EndOfWord_JumpToNextClue, 'Settings_CAGR_Navigation_EndOfWord_JumpToNextClue', 'Jump to next word at completed word')
    sPopupWindow += MakeSubTitleRow('Progress Indicators', 'Settings_STC')
    sPopupWindow += MakeCheckBox(g_bSettings_CA_Display_ShowProgress, 'Settings_CA_Display_ShowProgress', 'Show progress for clue answers')
    sPopupWindow += MakeCheckBox(g_bSettings_GR_Display_ShowProgress, 'Settings_GR_Display_ShowProgress', 'Show progress for grid answers')
    sPopupWindow += MakeCheckBox(g_bSettings_CAGR_Display_Complete, 'Settings_CAGR_Display_Complete', 'Show Puzzle (grid and clue answers) Solved')
    sPopupWindow += '</TABLE>'
    sPopupWindow += '</div>';
    sPopupWindow += '</span>';
    sPopupWindow += '</div>';
    document.getElementById('Popup_Button_Settings').innerHTML = sPopupWindow;
}

function Button_Settings_GetAllAndSaveCookie()
{
    g_bSettings_CAGR_Answers_CheckRow = document.getElementById('Settings_CAGR_Answers_CheckRow').checked;
    g_bSettings_CAGR_Answers_ShowCorrectLetters = document.getElementById('Settings_CAGR_Answers_ShowCorrectLetters').checked;
    g_bSettings_CAGR_Navigation_WithinWord_SkipFilledSquares = document.getElementById('Settings_CAGR_Navigation_WithinWord_SkipFilledSquares').checked;
    g_bSettings_CAGR_Navigation_EndOfWord_JumpBackToEmptySquare = document.getElementById('Settings_CAGR_Navigation_EndOfWord_JumpBackToEmptySquare').checked;
    g_bSettings_CAGR_Navigation_EndOfWord_JumpToNextClue = document.getElementById('Settings_CAGR_Navigation_EndOfWord_JumpToNextClue').checked;
    g_bSettings_CA_Display_ShowProgress = document.getElementById('Settings_CA_Display_ShowProgress').checked;
    g_bSettings_GR_Display_ShowProgress = document.getElementById('Settings_GR_Display_ShowProgress').checked;
    g_bSettings_CAGR_Display_Complete = document.getElementById('Settings_CAGR_Display_Complete').checked;
    StoreCookie_Settings();
}

var g_sCABOnSettingsClick = '';
var g_sGRBOnSettingsClick = '';

function Button_Settings_Toggle()
{
    var popup = document.getElementById("Button_Settings");
    popup.classList.toggle("show");
    if ( !g_bButton_Settings_Active )
    {
        g_sCABOnSettingsClick = g_CAB_Focus_sId;
        g_sGRBOnSettingsClick = g_GRB_Focus_sId;
    }
    else
    {
        if ( g_sCABOnSettingsClick != '')
            document.getElementById(g_sCABOnSettingsClick).focus();
            if ( g_sGRBOnSettingsClick != '')
            document.getElementById(g_sGRBOnSettingsClick).focus();
        g_sCABOnSettingsClick = '';
        g_sGRBOnSettingsClick = '';
    }
    g_bButton_Settings_Active = !g_bButton_Settings_Active;
}


