import './index.css';

/*
  表单生成器：http://json-schema.org

  schema format:
  
*/
$.widget("component.formerComp", {
  options: {
    $rootScope: undefined,
    formSchema: {}
  },
  _create: function () {

    this.options.formSchema = {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          title: 'Name',
          desc: ''
        },
        age: {
          type: 'number',
          title: 'Age',
          desc: ''
        },
        tags: {
          type: 'array',
          title: 'Tags',
          items: {
            type: 'string'
          },
        }
      },
      ui: {
        layout: 'grid',
        formsets: [
          [
            {
              //range: 9,
              span: [2, 4],
              fieldset: {
                name: {
                  tag: 'textbox',
                  placeholder: '请输入姓名'
                },
                age: {
                  tag: 'number',
                  placeholder: '请输入年龄'
                },
                $submit: {
                  tag: 'submit',
                  title: '查询',
                  class: "btn-primary ml-1"
                },
                $reset: {
                  tag: 'reset',
                  title: '重置',
                  class: "btn-default ml-1"
                }
              }
            }
          ]
        ]
      },
      validator: {
        name: {
          required: true,
          maxLength: 50
        },
        age: {
          required: true,
          min: 1,
          max: 120,
          regex: "^\d+$"
        }
      }
    };

    if (!this.options.formSchema) {
      console.error('`formBuilderComp`需要传入`formSchema`option');
      return;
    }

    // begin build
    let $form = this._layout(this.options.formSchema);


    // end


    this.element.append($form);
  },
  _layout: function ({ properties, ui }) {
    // grid: 'grid'
    // table: 'table'
    // template: ['template', 'http://template-url.html']

    let { layout, formsets } = ui;
    let $form = null;

    if (layout === 'grid') {
      $form = this._buildGrid(properties, formsets);
    } else if (layout === 'table') {
      $form = this._buildTable(properties, formsets);
    } else {
      $form = this._buildTemplate(properties, formsets);
    }

    return $form;
  },
  _formTemplate: {
    grid: {
      textbox: (prop, attr, span, validator) => {
        return `<label class="col-sm-${span[0]} control-label" for="ds_host">${prop.title}</label>
        <div class="col-sm-${span[1]}">
            <input class="form-control" id="ds_host" type="text" placeholder="${attr.placeholder}" />
        </div>`;
      },
      number: (prop, attr, span, validator) => {
        return `<label class="col-sm-${span[0]} control-label" for="ds_host">${prop.title}</label>
        <div class="col-sm-${span[1]}">
            <input class="form-control" id="ds_host" type="text" placeholder="${attr.placeholder}" />
        </div>`;
      },
      submit: (prop, attr, span, validator) => {
        return ` <button type="submit" class="btn btn-sm ${attr.class}">${attr.title}</button> `;
      },
      reset: (prop, attr, span, validator) => {
        return ` <button type="reset" class="btn btn-sm ${attr.class}">${attr.title}</button> `;
      },
    },
    horizontal: ''
  },
  _buildGrid: function (properties, formsets) {
    let $form = $('<form class="form-horizontal" role="form">');
    formsets.map((row) => {
      row.map((col) => {
        let $group = $('<div class="form-group form-group-sm mr-0">');
        let { range, span } = col;
        if (range) {
          $group.addClass(`col-sm-${range}`);
        }

        if (col.fieldset) {
          Object.keys(col.fieldset).map((key) => {
            let prop = properties[key];
            let attr = col.fieldset[key];

            //textbox(prop, attr, span, validator)
            let func =  this._formTemplate.grid[attr.tag];
            if(!func) {
              console.error(`控件${attr.tag}没有设置对应的模板.`);
              return null;
            }

            let template = this._formTemplate.grid[attr.tag](prop, attr, span, null);
            if (template) {
              $group.append($(template));
            }

          });
        }

        $form.append($group);
      });
    });

    return $form;
  },
  _buildTable: function (properties, formsets) { },
  _buildTemplate: function (properties, formsets) { }
});