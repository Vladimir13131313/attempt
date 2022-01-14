$(() => {
    const home_button = $("#home_button"),
        warehouses_button = $("#warehouses_button"),
        accounts_button = $("#accounts_button"),
        cards_button = $("#cards_button"),
        contacts_button = $("#contacts_button"),
        chat_button = $("#chat_button"),
        page_container = $("#main_container"),
        allButtons = $([])
            .add(home_button)
            .add(warehouses_button)
            .add(accounts_button)
            .add(cards_button)
            .add(contacts_button)
            .add(chat_button);



    home_button.click(function () {
        selected_link($(this));
        add_home_content($(this));
    });

    warehouses_button.click(function () {
        selected_link($(this));
        add_wh_content($(this));
    });

    accounts_button.click(function () {
        selected_link($(this));
        add_account_content($(this))
    });

    cards_button.click(function () {
        selected_link($(this));
        add_card_content($(this));
    });

    contacts_button.click(function () {
        selected_link($(this));
        add_contact_content($(this));
    });

    chat_button.click(function () {
        selected_link($(this));
        add_chat_content($(this));
    });

    const selected_link = (object) => {
        unselected_links();
        object.addClass("selected_link_bar");
        object.children("svg").children("g").addClass("change_opacity");
        object.children("svg").children("g").children("path").addClass("change_color");
        object.children("svg").children("path").addClass("change_color");
    }

    const unselected_links = () => {
        allButtons.each(function (i) {
            $(this).removeClass("selected_link_bar");
            $(this).children("svg").children("g").removeClass("change_opacity");
            $(this).children("svg").children("g").children("path").removeClass("change_color");
            $(this).children("svg").children("path").removeClass("change_color");
        })
    }

    const wh_content = (obj) => {
        return common_content(obj,
            `
            <div>
                <select id="sorted_by">
                     <option class="sorter" disabled selected>Filter by</option>
                     <option class="sorter" >Names</option>
                     <option class="sorter" >Number (straight)</option>
                     <option class="sorter" >Number (reverse)</option>
                     <option class="sorter" >Length(straight)</option>
                     <option class="sorter" >Length (reverse)</option>
                     <option class="sorter" >Width (straight)</option>
                     <option class="sorter" >Width (reverse)</option>
                     <option class="sorter" >Height (straight)</option>
                     <option class="sorter" >Height (reverse)</option>
                     <option class="sorter" >Reset</option>
                </select>
                <button
                        class="common_button add_warehouse_btn"
                        style="width: 190px"
                        id="adding_button"
                >Add a warehouse + </button>
            </div>
        `, `
            <div class="warehouses_list">
                <table class="table" id="warehouse_table">
                    <tr>
                        <th><img src="../assets/Rectangle%201384.svg" alt="square"></th>
                        <th>All stores</th>
                        <th>Number of products</th>
                        <th>Length, m</th>
                        <th>Width, m</th>
                        <th>Height, m</th>
                    </tr>
                </table>
            </div>
        `)
    }

    const rest_content = (obj) => {
        return common_content(obj, '', '')
    }

    const common_content = (obj, name_line, all_conent) => {
      return `
            <div class="window_panel">
                <h1 class="window_title">${obj.children("div").children("div").text()}</h1>
                ${name_line}
            </div>
            ${all_conent}
      `
    }

    const add_wh_content = (obj) => {
        page_container.empty();
        page_container.append(wh_content(obj));
        wh_logic();
    }
    
    const add_home_content = (obj) => {
        page_container.empty();
        page_container.append(rest_content(obj));
    }
    
    const add_account_content = (obj) => {
        page_container.empty();
        page_container.append(rest_content(obj));
    }
    
    const add_card_content = (obj) => {
        page_container.empty();
        page_container.append(rest_content(obj));
    }

    const add_contact_content = (obj) => {
        page_container.empty();
        page_container.append(rest_content(obj));
    }
    
    const add_chat_content = (obj) => {
        page_container.empty();
        page_container.append(rest_content(obj));
    }

    const start = () => {
        selected_link(warehouses_button);
        add_wh_content(warehouses_button);
    }

    start();

    // -------------------------------- WH logic ------------------------------------
    function wh_logic() {
        const sorted_by = $("#sorted_by"),
            name_input = $("#input_form_name"),
            length_input = $("#input_form_length"),
            width_input = $("#input_form_width"),
            height_input = $("#input_form_height"),
            adding_a_warehouse = $("#adding_a_warehouse"),
            success = $("#success"),
            adding_button = $("#adding_button"),
            add_btn = $("#add_btn"),
            continue_btn = $("#continue_btn"),
            list_of_warehouses = new Array(),
            warehouse = "warehouse list",
            sorted_warehouse = "sorted warehouse list",
            warehouse_table = $("#warehouse_table"),
            allFields = $([]).add(name_input).add(length_input).add(width_input).add(height_input);

        // localStorage.setItem(warehouse, JSON.stringify(list_of_warehouses));

        warehouse_table.click(event => {
            let obj = $(event.target)
            console.log(obj.parent())
        })

        adding_a_warehouse.dialog({
            autoOpen: false,
            width: 624,
            height: 738,
            modal: true,
            draggable: false,
            resizable: false,
            close: function() {
                name_input.val("");
                length_input.val("");
                width_input.val("");
                height_input.val("");
            }
        });

        success.dialog({
            autoOpen: false,
            width: 622,
            height: 638,
            modal: true,
            draggable: false,
            resizable: false,
            close: function() {}
        })

        adding_button.click(() => {
            open_adding_a_warehouse()
        });

        add_btn.click((event) => {
            event.preventDefault()
            if (checkWarehouse(name_input, length_input, width_input, height_input)) {
                let warehouse = {
                    name: name_input.val(),
                    quantity: 0,
                    len: length_input.val(),
                    wid: width_input.val(),
                    height: height_input.val()
                }
                update_storage(warehouse);
                draw_table(warehouse);
                open_success();
            }


        });

        continue_btn.click(() => {
            finish_adding();
        });

        sorted_by.selectmenu({
            change: (event, data) => {
                sorting_array(data.item.value);
            }
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
            return (`<tr class="table_line">
                        <td><img src="../assets/Rectangle%201384.svg" alt="square"></td>
                        <td>${name}</td>
                        <td>${quan}</td>
                        <td>${len}</td>
                        <td>${wid}</td>
                        <td>${hei}</td>
                    </tr>`);
        }

        const draw_table = (wh_item) => {
            warehouse_table.append(create_table_line(wh_item.name, wh_item.quantity, wh_item.len, wh_item.wid, wh_item.height));
        }

        const create_table = (storage_token) => {
            try {
                let current_list = JSON.parse(localStorage.getItem(storage_token));
                // console.log(current_list);
                current_list.forEach(item => {
                    draw_table(item);
                });
            } catch (e) {
                console.log(e);
            }
        }

        const clear_table = () => {
            let table_lines = $(".table_line");
            table_lines.remove();
        }

        const checkLength = (object, min) => {
            if (object.val().length < min) {
                object.addClass("ui-state-error");
                return false
            } else {
                return true
            }
        }

        const checkNumeric = (object) => {
            if (object.val().length > 0) {
                if (isNaN(object.val())) {
                    object.addClass("ui-state-error");
                    return false;
                } else {
                    return true;
                }
            } else {
                object.addClass("ui-state-error");
                return false;
            }
        }

        const checkWarehouse = (name, len, wid, hei) => {
            let valid = true;
            allFields.removeClass("ui-state-error");
            valid = checkLength(name, 5) && valid;
            valid = checkNumeric(len) && valid;
            valid = checkNumeric(wid) && valid;
            valid = checkNumeric(hei) && valid;
            return valid;
        }

        const byField_straight = (field) => {
            return (a, b) => a[field] > b[field] ? 1 : -1;
        }

        const byField_reverse = (field) => {
            return (a, b) => a[field] < b[field] ? 1 : -1;
        }

        const sorter = (kind, field) => {
            let current_list = JSON.parse(localStorage.getItem(warehouse));
            kind === "straight" ?
                current_list.sort(byField_straight(field))
                :
                current_list.sort(byField_reverse(field));
            localStorage.setItem(sorted_warehouse, JSON.stringify(current_list));
            clear_table();
            create_table(sorted_warehouse);
        }

        const sorting_array = (data) => {
            const straight = "straight",
                reverse = "reverse";
            switch(data) {
                case 'Names':
                    sorter(straight, "name");
                    break;
                case 'Number (straight)':
                    sorter(straight, "quantity");
                    break;
                case 'Number (reverse)':
                    sorter(reverse, "quantity");
                    break;
                case 'Length(straight)':
                    sorter(straight, "len");
                    break;
                case 'Length (reverse)':
                    sorter(reverse, "len");
                    break;
                case 'Width (straight)':
                    sorter(straight, "wid");
                    break;
                case 'Width (reverse)':
                    sorter(reverse, "wid");
                    break;
                case 'Height (straight)':
                    sorter(straight, "height");
                    break;
                case 'Height (reverse)':
                    sorter(reverse, "height");
                    break;
                case 'Reset':
                    clear_table();
                    create_table(warehouse);
                    break;
            }
        }
        // update_storage({
        //     name: "Warehouse No. 1",
        //     quantity: 943,
        //     len: 14,
        //     wid: 24,
        //     height: 4
        // });


        // localStorage.clear();

        create_table(warehouse);
    }
})