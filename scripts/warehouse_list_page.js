$(document).ready(function () {
    const sorted_by = $("#sorted_by").selectmenu(),
        adding_a_warehouse = $("#adding_a_warehouse").dialog({
            autoOpen: false,
            width: 624,
            height: 738,
            modal: true,
            draggable: false,
            resizable: false,
            close: function() {}
        }),
        success = $("#success").dialog({
            autoOpen: false,
            width: 622,
            height: 638,
            modal: true,
            draggable: false,
            resizable: false,
            close: function() {}
        }),
        adding_button = $("#adding_button"),
        add_btn = $("#add_btn"),
        continue_btn = $("#continue_btn"),
        list_of_warehouses = new Array(),
        warehouse = "warehouse list",
        warehouse_table = $("#warehouse_table");

    // localStorage.setItem(warehouse, JSON.stringify(list_of_warehouses));

    adding_button.click(() => {
        open_adding_a_warehouse()
    });

    add_btn.click((event) => {
        event.preventDefault()
        open_success();
    });

    continue_btn.click(() => {
        finish_adding();
    });

    const open_adding_a_warehouse = () => {
        adding_a_warehouse.dialog("open");
    }
    const open_success = () => {
        success.dialog("open");
        adding_a_warehouse.dialog("close");
    }
    const finish_adding = () => {
        success.dialog("close");
    }
    const add_item_to_warehouse_list = (list_of_items,
                                        name,
                                        number_of_products,
                                        wh_length,
                                        wh_width,
                                        wh_height) => {
        let current_warehouse = {
            name,
            quantity: number_of_products,
            len: wh_length,
            wid: wh_width,
            height: wh_height
        }
        list_of_items.push(current_warehouse);
        return list_of_items;
    }

    const update_storage = (item) => {
        if (JSON.parse(localStorage.getItem(warehouse)) !== null) {
            let current_list = JSON.parse(localStorage.getItem(warehouse));
            let updated_list = add_item_to_warehouse_list(
                current_list,
                item.name,
                item.quantity,
                item.len,
                item.wid,
                item.height);
            localStorage.setItem(warehouse, JSON.stringify(updated_list));
        } else {
            let new_list = add_item_to_warehouse_list(
                list_of_warehouses,
                item.name,
                item.quantity,
                item.len,
                item.wid,
                item.height);
            localStorage.setItem(warehouse, JSON.stringify(new_list));
        }

    }

    const create_table_line = (name, quan, len, wid, hei) => {
        return (`<tr>
                        <td><img src="../assets/Rectangle%201384.svg" alt="square"></td>
                        <td>${name}</td>
                        <td>${quan}</td>
                        <td>${len}</td>
                        <td>${wid}</td>
                        <td>${hei}</td>
                    </tr>`);
    }
    
    const draw_table = (name, quan, len, wid, hei) => {
      warehouse_table.append(create_table_line(name, quan, len, wid, hei));
    }

    const create_table = () => {
        try {
            let current_list = JSON.parse(localStorage.getItem(warehouse));
            console.log(current_list);
            current_list.forEach(item => {
                draw_table(item.name, item.quantity, item.len, item.wid, item.height);
            });
        } catch (e) {
            console.log(e);
        }
    }

    // update_storage({
    //     name: "Warehouse No. 1",
    //     quantity: "943",
    //     len: "14",
    //     wid: "24",
    //     height: "4"
    // });


    // localStorage.clear();

    create_table();




})