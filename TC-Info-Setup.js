// TC-Button-Info.js
//
var g_sCAOnInfoClick = '';
var g_sGRBOnInfoClick = '';
var g_bButton_Info_Active = false;

function Load_Button_Info()
{
    var sPopupWindow = '';
    sPopupWindow += '<div class="Button_Info">';
    sPopupWindow += '<span class="Button_Info_Text" Id="Button_Info" onclick="Button_Info_Click();">';
    sPopupWindow += '<div class=Info_DivBorder>'; 
    sPopupWindow += Make_Info_Content();
    sPopupWindow += '</div></span></div>';
    document.getElementById('Popup_Button_Info').innerHTML = sPopupWindow;
    Make_Info_Content_Update();
}

function Make_Button_Info()
{
    sImage = '<img Id="Button_Info_Image" src="images/Button_Info.png" alt="Info" width=100%>';
    sInnerHTML = '';
    sInnerHTML += '<BUTTON class="TopRowControl_Button" onclick="Button_Info_Click();">';
    sInnerHTML += sImage;
    sInnerHTML += '</BUTTON>';
    return sInnerHTML;
}


function Button_Info_Click()
{
    if ( !g_bButton_Info_Active && !Dropdown_CanOpen() )
        return;
    var popup = document.getElementById("Button_Info");
    popup.classList.toggle("show");
    if ( !g_bButton_Info_Active )
    {
        g_sCAOnInfoClick = g_CAB_Focus_sId;
        g_sGRBOnInfoClick = g_GRB_Focus_sId;
    }
    else
    {
        if ( g_sCAOnInfoClick != '')
            document.getElementById(g_sCAOnInfoClick).focus();
        if ( g_sGRBOnInfoClick != '')
            document.getElementById(g_sGRBOnInfoClick).focus();
        g_sCAOnInfoClick = '';
        g_sGRBOnInfoClick = '';
    }
    g_bButton_Info_Active = !g_bButton_Info_Active;
}



