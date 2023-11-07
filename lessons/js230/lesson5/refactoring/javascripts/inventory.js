var inventory;

(function() {
  inventory = {
    lastId: 0,
    collection: [],
    setDate: function() {
      var date = new Date();
      document.getElementById("order_date").textContent = date.toUTCString();
    },
    cacheTemplate: function() {
      this.template = Handlebars.compile(document.getElementById('inventory_item').innerHTML);
    },
    add: function() {
      this.lastId++;
      var item = {
        id: this.lastId,
        name: "",
        stock_number: "",
        quantity: 1
      };
      this.collection.push(item);

      return item;
    },
    remove: function(idx) {
      this.collection = this.collection.filter(function(item) {
        return item.id !== idx;
      });
    },
    get: function(id) {
      var found_item;

      this.collection.forEach(function(item) {
        if (String(item.id) === id) {
          found_item = item;
          return false;
        }
      });

      return found_item;
    },
    update: function(item) {
      var id = this.findID(item),
          collectionItem = this.get(id);

      collectionItem.name = item.querySelector("[name^=item_name]").value;
      collectionItem.stock_number = item.querySelector("[name^=item_stock_number]").value;
      collectionItem.quantity = item.querySelector("[name^=item_quantity]").value;
    },
    newItem: function(e) {
      e.preventDefault();
      var item = this.add(),
          node = this.createNodeFromTemplate(item);

      document.getElementById('inventory').appendChild(node);
    },
    findParent: function(e) {
      return e.target.closest("tr");
    },
    findID: function(item) {
      return item.querySelector("input[type=hidden]").value;
    },
    deleteItem: function(e) {
      e.preventDefault();
      var item = this.findParent(e);

      item.remove();
      this.remove(this.findID(item));
    },
    updateItem: function(e) {
      var item = this.findParent(e);

      this.update(item);
    },
    bindEvents: function() {
      document.getElementById('add_item').addEventListener('click', this.newItem.bind(this));
      document.getElementById('inventory').addEventListener('focusout', this.updateItem.bind(this));
      document.getElementById('inventory').addEventListener('click', event => {
        if (!event.target.classList.contains('delete')) return;
        this.deleteItem.call(inventory, event);
      });
    },
    createNodeFromTemplate: function(data) {
      let template = document.createElement('template');
      template.innerHTML = this.template(data).trim();
      return template.content.firstChild;
    },
    init: function() {
      this.setDate();
      this.cacheTemplate();
      this.bindEvents();
    }
  };
})();

document.addEventListener('DOMContentLoaded', inventory.init.bind(inventory));