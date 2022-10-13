// misc.js
// 
// this function allows for closing popup style windows
window.onclick = function(event) 
{
	var sTargetId = event.target.id;
	if ( g_bSuccessWindow_Active && sTargetId != '')
	{
		//SuccessWindowPopup_Toggle(true);
	}
	if ( g_bButton_Info_Active && ( sTargetId != "Button_Info_Image") )
	{
    	dropdown = document.getElementById('Button_Info');
    	dropdown.classList.toggle('show'); 
		g_bButton_Info_Active= false;
	}
	if ( g_bPlaceWindow_Active && !sTargetId.startsWith('Place_') )
		Place_Popup_Toggle();

	if ( g_bButton_Settings_Active && sTargetId != '' && ( sTargetId.indexOf('Settings') == -1) )
	{
		var popup = document.getElementById("Button_Settings");
		popup.classList.toggle("show");
		g_bButton_Settings_Active = !g_bButton_Settings_Active;
	}
	if ( g_bDropdown_Menu_Active && ( sTargetId != "Button_More_Image") )
	{
    	dropdown = document.getElementById('Dropdown_More_Content');
    	if (dropdown.classList.contains('show')) 
    	{
    		dropdown.classList.remove('show');
    	}
		g_bDropdown_Menu_Active = !g_bDropdown_Menu_Active;
   }
}

function SetInitialSelection()
{
    var sCABBox = CAB_MakeId(0, 0);
    var sGRBBox = GRB_MakeId(0, 1);
	document.getElementById(sGRBBox).focus();
}

function LoadInnerHTML()
{
	LoadTwistiCrossAndPopup();
	LoadSuccessWindowPopup();	
	document.getElementById('PT').innerHTML = g_sPuzzleTitle;
	document.getElementById('CA01CI').innerHTML = g_sSketchiToonsClueIntro;
	document.getElementById('CA01C').innerHTML = g_sSketchiToonsClueItself;
	GRB_MakeGridAsButtons();
	CAB_LoadClueAnswerSection();
	KB_Set_innerHTML();
	CA_Place_Popup_Setup();
	SetInitialSelection();
}



