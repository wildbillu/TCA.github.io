// TC-SketchiToonsFullWindow.js
//
var g_bSuccessWindow_Active = false;

function LoadSuccessWindowPopup()
{
    var sPopupWindow = '';
    sPopupWindow += '<div class="SuccessWindow_popup">';
    sPopupWindow += '<span class="SuccessWindow_popuptext" Id="SuccessWindow_Popup" onclick="SuccessWindowPopup_Toggle();">';
    sPopupWindow += '<img src="' + g_sSuccessWindowFilename + '" Id="SuccessWindow_Image" alt="Success" width=100%>';
    sPopupWindow += '</span></div>';
    document.getElementById('Popup_SuccessWindow').innerHTML = sPopupWindow;
}

function SuccessWindowPopup_Toggle(bOverride)
{
    if ( !g_bSuccessWindow_Active && !Dropdown_CanOpen() && !bOverride )
        return;
    var popup = document.getElementById("SuccessWindow_Popup");
    popup.classList.toggle("show");
    g_bSuccessWindow_Active = !g_bSuccessWindow_Active;

}


