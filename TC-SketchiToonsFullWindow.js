// TC-SketchiToonsFullWindow.js
//

var g_bSketchiToonsFullWindow_Active = false;

function LoadTwistiCrossAndPopup()
{
    var sTwistiCrossImage = '';
    sTwistiCrossImage += '<TABLE>'
    sTwistiCrossImage += '<TR><TD width=200px>'    
    sTwistiCrossImage += '<img onclick="SketchiToonPopup_Toggle();" src="' + g_sSketchiToonsFilename + '" alt="BB" height="200">';
    sTwistiCrossImage += '</TR></TD></TABLE>'  
    document.getElementById('TwistiCrossImage').innerHTML = sTwistiCrossImage;
    var sPopupWindow = '';
    sPopupWindow += '<div class="SketchiToon_popup">';
    sPopupWindow += '<span class="SketchiToon_popuptext" Id="SketchiToon_Popup" onclick="SketchiToonPopup_Toggle();">';
    sPopupWindow += '<img src="' + g_sSketchiToonsFilename + '" alt="AA" width=100%>';
    sPopupWindow += '</span></div>';
    document.getElementById('Popup_SketchiToonsFull').innerHTML = sPopupWindow;
}

function SketchiToonPopup_Toggle()
{
    if ( !g_bSketchiToonsFullWindow_Active && !Dropdown_CanOpen() )
        return false;
    var popup = document.getElementById("SketchiToon_Popup");
    popup.classList.toggle("show");
    g_bSketchiToonsFullWindow_Active = !g_bSketchiToonsFullWindow_Active;

}


