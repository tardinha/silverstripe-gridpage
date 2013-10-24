(function ($) {

    $.entwine('ss', function ($) {

        var grideditor;

        $('#grideditorholder').entwine({
            onmatch:function () {

                //lang
                ss.i18n.init();
                GridEditor.lang = ss.i18n.getLocale();

                //width options
                GridEditor.widthOptions = [
                    ['12/12', 100, 'span12'],
                    ['11/12', 91.66, 'span11'],
                    ['10/12', 83.33, 'span10'],
                    ['9/12', 75, 'span9'],
                    ['8/12', 66.66, 'span8'],
                    ['7/12', 58.33, 'span7'],
                    ['6/12', 50, 'span6'],
                    ['5/12', 41.66, 'span5'],
                    ['4/12', 33.33, 'span4'],
                    ['3/12', 25, 'span3'],
                    ['2/12', 16.66, 'span2'],
                    ['1/12', 8.33, 'span1']
                ];

                //column classes
                GridEditor.columnClasses = [
                    ['Omlijning', 'bordered'],
                    ['Achtergrond kleur', 'backgroundcolor'],
                    ['Omlijning en achtergrond kleur', 'bordered backgroundcolor']
                ];

                //content editor
                GridEditor.contenteditor = {
                    editor: '<textarea name="tinyMCEEditor" class="htmleditor" id="tinyMCEEditor" tinymce="true" style="width: 100%;"></textarea>',
                    setContent: function(jElement, content){
                        var intv = setInterval(function(){
                            var editor = tinyMCE.get('tinyMCEEditor');
                            if(editor){
                                editor.setContent(content);
                                jElement.find('iframe').height((jElement.height() - 200) + 'px');
                                clearInterval(intv);
                            }
                        }, 50);
                        return false;
                    },
                    getContent: function(jElement){
                        return tinyMCE.get('tinyMCEEditor').getContent();
                    }
                };

                //content preview
                GridEditor.cleanContentPreview = true;
                GridEditor.maxLengthContentPreview = 150;

                //grid
                grideditor = new GridEditor.BaseGrid(this, 50, 2);
                grideditor.loadJSON( $('#Form_EditForm_GridContent').val() );

            }
        });

        $('.cms-edit-form').entwine({
            onsubmit:function (e, button) {
                $('#Form_EditForm_GridContent').val(grideditor.exportJSON());
                return this._super(e, button);
            }
        });

    });

})(jQuery);

