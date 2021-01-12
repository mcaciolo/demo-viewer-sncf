// get selected object
function xcustom_getCurrentSelectedObject() {
    // if (g_viewer._pickedObject == -1) {
    //     return null;
    // }
    // return g_instances[g_viewer._pickedObject - 1];
    if (0 === g_viewer._selectedObjects.length) {
        return null;
    }
    return g_instances[g_viewer._selectedObjects[0] - 1];
}


// make an cation on object selection
function xcustom_makeActionOnObjectSelection() {
    var currentSelectedObject = xcustom_getCurrentSelectedObject();
    if (null === currentSelectedObject) {
        // console.log('Nothing Selected...');
        xcustom_resetAndClosePanelSelectedObjectContent();
        $('#xcustom-div-right-panel').hide();
        return;
    }
    // console.log('The Selected Object Is : ', currentSelectedObject);
    xcustom_showSelectedObjectDataOnViewer(currentSelectedObject);
}


// reset the content of panel object data
function xcustom_resetAndClosePanelSelectedObjectContent() {
    $('#xcustom-div-prop-grid').html('');
    $('#xcustom-div-right-panel').hide();
}


// create the content of panel display data
function xcustom_createSelectedObjectPanelContet(theObject) {
    if (theObject) {
        
		var html = '<ol> <li class="tree">';
		
		html += '<label for="ifcData">Données IFC</label><input type="checkbox" id="ifcData" />';
		html += '<ol><li><table class="table table-striped"><tbody>';
		html += '<tr><th scope="row" class="xcustom-th-prop-grid">'+'ifcGuid'+'</th><td class="xcustom-td-prop-grid">'+theObject['uri']+'</td></tr>';
		html += '<tr><th scope="row" class="xcustom-th-prop-grid">'+'Classification Ifc'+'</th><td class="xcustom-td-prop-grid">'+theObject['group']+'</td></tr>';
		html += '</tbody></table></li></ol></li></ol>';
		
		ifcObjectProp = ifcData[theObject['uri']];
		Object.entries(ifcObjectProp).forEach(([propSetName, propSet]) => {
			
			html += '<ol> <li class="tree">';
			html += '<label for="' + propSetName + '">' + propSetName + '</label><input type="checkbox" id="' + propSetName + '" />';
			html += '<ol><li><table class="table table-striped"><tbody>';
			
			Object.entries(propSet).forEach(([propName, propValue]) => {
				html += '<tr><th scope="row" class="xcustom-th-prop-grid">'+propName+'</th><td class="xcustom-td-prop-grid">'+propValue+'</td></tr>';
			});
			
			html += '</tbody></table></li></ol></li></ol>';
			
		});
		
        return html;
    }
    return '';
}

// create the content of error display data
function xcustom_createSelectedErrorPanelContet(theObject) {
    if (theObject) {
        
		var html = '';
        
        try {
            ifcErrorProp = errorData[theObject['uri']];
            Object.entries(ifcErrorProp).forEach(([errName, errMessage]) => {
                
                html += '<ol> <li class="tree">';
                html += '<label for="' + errName + '">' + errName + '</label><input type="checkbox" id="' + errName + '" />';
                html += '<ol><li>' + errMessage + '</li></ol></li></ol>';
                
            });
        }
        catch(e) {}
		
        return html;
    }
    return '';
}


// show the selecte objected data on viewer
function xcustom_showSelectedObjectDataOnViewer(theObject) {
    if (theObject) {
        // console.log(theObject);
        xcustom_resetAndClosePanelSelectedObjectContent();
        $('#xcustom-div-prop-grid').html(xcustom_createSelectedObjectPanelContet(theObject));
        $('#xcustom-div-error-grid').html(xcustom_createSelectedErrorPanelContet(theObject));
        $('#xcustom-div-right-panel').show();
    }
}


// set the action to do when mouse right click
function xcustom_onContextMenu(event) {
    console.log('there we are...');
}



// ---------------- Menu panel


// hide or show the menu panel
$("#xcustom-btn-aba").click(function() {
    if ('none' === $("#xcustom-div-b").css('display')) {
        $("#xcustom-div-b").toggle()
    } else {
        $("#xcustom-div-b").hide()
    }
});

// hide or show the data panel
$("#xcustom-btn-abb").click(function() {
    if ('none' === $("#xcustom-div-right-panel").css('display')) {
        $("#xcustom-div-right-panel").show()
    }
    else {
        $("#xcustom-div-right-panel").hide();
    }
});

function hideAllMenuPanels() {
    $("#xcustom-div-baba").hide();
    $("#select-container").hide();
    $("#xcustom-div-babb").hide();
    $("#xcustom-div-babc").hide();
}

function deselectAllMenuPanelButtons() {
    $("#xcustom-btn-baaa").removeClass('btn-danger');
    $("#xcustom-btn-baab").removeClass('btn-danger');
    $("#xcustom-btn-baac").removeClass('btn-danger');
    $("#xcustom-btn-baad").removeClass('btn-danger');
}

function selectOneMenuPanelButton(id) {
    deselectAllMenuPanelButtons();
    $('#'+id).addClass('btn-danger');
}

// interact with Models btn
$("#xcustom-btn-baaa").click(function() {
    hideAllMenuPanels();
    $("#xcustom-div-baba").show();
    selectOneMenuPanelButton(this.id);
});

// interact with Classes btn
$("#xcustom-btn-baab").click(function() {
    hideAllMenuPanels();
    $("#select-container").show();
    selectOneMenuPanelButton(this.id);
});

// interact with System btn
$("#xcustom-btn-baac").click(function() {
    hideAllMenuPanels();
    $("#xcustom-div-babb").show();
    selectOneMenuPanelButton(this.id);
});

// interact with Storeys btn
$("#xcustom-btn-baad").click(function() {
    hideAllMenuPanels();
    $("#xcustom-div-babc").show();
    selectOneMenuPanelButton(this.id);
});


// ---------------- Right panel

function hideAllRightPanels() {
    $("#xcustom-div-prop-grid").hide();
    $("#xcustom-div-error-grid").hide();
}

function deselectAllRightPanelButtons() {
    $("#xcustom-btn-rp-prop").removeClass('btn-danger');
    $("#xcustom-btn-rp-error").removeClass('btn-danger');
}

function selectOneRightPanelButton(id) {
    deselectAllRightPanelButtons();
    $('#'+id).addClass('btn-danger');
}

// interact with Prop button
$("#xcustom-btn-rp-prop").click(function() {
    hideAllRightPanels();
    $("#xcustom-div-prop-grid").show();
    selectOneRightPanelButton(this.id);
});

// interact with Error button
$("#xcustom-btn-rp-error").click(function() {
    hideAllRightPanels();
    $("#xcustom-div-error-grid").show();
    selectOneRightPanelButton(this.id);
});

// interact with Error show btn
$("#xcustom-btn-rp-show-error").click(function() {
    for (var i = 0; i < g_instances.length; i++) {
        g_instances[i].visible = ( g_instances[i]['uri'] in errorData);
    }
});
