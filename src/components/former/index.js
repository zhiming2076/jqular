import './index.css';

/*
  表单生成器：http://json-schema.org

  schema format:
  {
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string'
        }, 
        age: {
          type: 'number',
          min: 0,
          max: 120
        }, 
        tags: {
          type: 'array',
          items: {
            type: 'string'
          },

        }
      },
      required: ['name', 'age']
    },
    form: {
      device: 'client', // => cliend or mobile
      layout: 'grid', // => grid or table layout
      fields: [
        {
          key: 'name',
          span: [3, 2], // => [lg, md, sm, xs]
        },
        {
          key: 'age',

        }
      ]
    }
  }
*/
$.widget("component.formerComp", {
  options: {
    $rootScope: undefined,
    formSchema: {}
  },
  _create: function () {

    this.options.formSchema = {
      schema: {
        type: 'object',
        properties: {
          name: {
            type: 'string'
          },
          age: {
            type: 'number',
            min: 0,
            max: 120
          },
          tags: {
            type: 'array',
            items: {
              type: 'string'
            },

          }
        },
        required: ['name', 'age']
      },
      form: {
        client: {
          layout: ['grid', [4, 4, 3]], // => [0]: grid or table layout, [1]: columns, lg\md\sm\xs, [2]: rows(when table available) 
          span: [[6, 18]], //[0]: lable span, [1]: input span, lg\md\sm\xs
          fields: [
            {
              key: 'name',
              span: [8, 16], // => [lg, md, sm, xs]
            },
            {
              key: 'age',
            }
          ]
        },
        mobile: {}
      }
    };

    if (!this.options.formSchema) {
      console.error('formBuilderComp need formSchema option');
      return;
    }

    let form = $("<form>");
    // begin build
    this._layout(form, this.options.formSchema);



    // end


    this.element
      .text("former");
  },
  _layout: function (form, formSchema) {
    let { form: { client: { layout, span, fields } } } = formSchema;
    console.log(layout);
    console.log(span);
    console.log(fields);
  }
});