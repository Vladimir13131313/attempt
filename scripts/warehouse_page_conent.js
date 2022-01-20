$(() => {
    const home_button = $("#home_button"),
        adding_cargo_form = $("#adding_cargo_form").dialog({autoOpen: false}),
        finish_adding_cargo = $("#success_adding_cargo").dialog({autoOpen: false}),
        moving_cargo = $("#moving_cargo").dialog({autoOpen: false}),
        finish_moving_cargo = $("#success_moving_cargo").dialog({autoOpen: false}),
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

    const left_bar_buttons = (button, func) => {
        button.click(function () {
            selected_link($(this));
            func($(this))
        });
    }



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
        return common_content(obj.children("div").children("div").text(),
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
        return common_content(obj.children("div").children("div").text(), '', '')
    }

    const common_content = (name, name_line, all_conent) => {
      return `
            <div class="window_panel">
                <h1 class="window_title">${name}</h1>
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

    left_bar_buttons(home_button, add_home_content);
    left_bar_buttons(warehouses_button, add_wh_content);
    left_bar_buttons(accounts_button, add_account_content);
    left_bar_buttons(cards_button, add_card_content);
    left_bar_buttons(contacts_button, add_contact_content);
    left_bar_buttons(chat_button, add_chat_content);
    start();

    // -------------------------------- WH logic ------------------------------------
    function wh_logic() {
        const sorted_by = $("#sorted_by"),
            body = $("body"),
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

        warehouse_table.click(event => {
            let obj = $(event.target).parent();
            if (obj.prop('tagName') !== "TD" && obj.prop('tagName') !== "TH") {
                if ($(obj.children()[1]).text() !== "All stores") {
                    page_container.empty();
                    page_container.append(one_warehouse_main($(obj.children()[1]).text()));
                    body.append()
                    one_wh_logic($(obj.children()[1]).text());
                }
            }
        });

        function modals (name) {
            return ''
        }

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

        const one_warehouse_main = (name) => {
            return `
                <div class="window_panel">
                    <h1 class="window_title">${name}</h1>
                    <div>
                        <select id="products_sort">
                            <option class="sorter" disabled selected>Filter by</option>
                            <option class="sorter" >Names</option>                         
                        </select>
                        <button
                            class="common_button add_warehouse_btn"
                            id="adding_cargo_button_${name.replace(/[.*+?^${}()|[\]\\]/g, "").replace(/ /g, '')}"
                        >Add cargo + </button>
                    </div>
                </div>
                <div class="warehouses_list">
                <table class="table" id="products_table_${name.replace(/[.*+?^${}()|[\]\\]/g, "").replace(/ /g, '')}">
                    <tr>
                        <th><img id="${name.replace(/[.*+?^${}()|[\]\\]/g, "").replace(/ /g, '')}" src="../assets/Rectangle%201384.svg" alt="square"></th>
                        <th>All products</th>
                        <th>Manufacturer</th>
                        <th>Item number</th>
                        <th>Purchasing technology</th>
                        <th>Shipment method</th>
                    </tr>
                </table>
            </div>
            `
        }

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
            if (object.val().length) {
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

        // ----------------------------- product list logic ----------------------------------------
        function one_wh_logic(wh_name) {
            const products_sort = $("#products_sort"),
                input_product_name = $("#input_product_name"),
                input_manufacturer = $("#input_manufacturer"),
                input_item_number = $("#input_item_number"),
                adding_cargo_button = $("#adding_cargo_button"+"_"+wh_name.replace(/[.*+?^${}()|[\]\\]/g, "").replace(/ /g, '')),
                finish_adding_cargo_btn = $("#finish_adding_cargo"),
                steps_cargo_adding = $("#steps_cargo_adding"),
                first_step_btn = $("#first_step"),
                second_step_btn = $("#second_step"),
                third_step_btn = $("#third_step"),
                shipment_by_plane_btn = $("#shipment_by_plane"),
                shipment_by_sea_btn = $("#shipment_by_sea"),
                shipment_by_car_btn = $("#shipment_by_car"),
                payment_by_card_btn =$("#payment_by_card"),
                payment_in_cash_btn = $("#payment_in_cash"),
                payment_by_paypal = $("#payment_by_paypal"),
                what_way_to_pay = {card: false, paypal: false, cash: false},
                what_way = {plane: false, sea: false, car: false},
                product_table = $("#products_table"+"_"+wh_name.replace(/[.*+?^${}()|[\]\\]/g, "").replace(/ /g, '')),
                all_payment_btns = $([]).add(payment_by_card_btn).add(payment_by_paypal).add(payment_in_cash_btn),
                all_shipment_btns = $([]).add(shipment_by_plane_btn).add(shipment_by_sea_btn).add(shipment_by_car_btn),
                all_fields = $([]).add(input_product_name).add(input_manufacturer).add(input_item_number),
                form_header = $("#form_header"),
                all_checks = $("#"+wh_name.replace(/[.*+?^${}()|[\]\\]/g, "").replace(/ /g, '')),
                warehouse_page = $("#warehouse_page"),
                body = $("body");

            all_checks.click(function () {
                if ($(this).attr("src") === "../assets/check.svg") {
                    change_attribute($(this), "src", "../assets/Rectangle%201384.svg");
                    change_attribute($(".check"), "src", "../assets/Rectangle%201384.svg");
                    let selected_list = set_all_checked(JSON.parse(localStorage.getItem(wh_name)), false);
                    localStorage.setItem(wh_name, JSON.stringify(selected_list))
                    close_down_bar();
                } else {
                    change_attribute($(this), "src", "../assets/check.svg");
                    change_attribute($(".check"), "src", "../assets/check.svg");
                    let selected_list = set_all_checked(JSON.parse(localStorage.getItem(wh_name)), true);
                    localStorage.setItem(wh_name, JSON.stringify(selected_list));
                    // console.log(JSON.parse(localStorage.getItem(wh_name)));
                    start_down_bar();
                }
            });

            product_table.click(function (event) {
                // console.log($(event.target).attr("class"))
                if ($(event.target).attr("class") == "check") {
                    if ($(event.target).attr("src") === "../assets/check.svg") {
                        change_attribute($(event.target), "src", "../assets/Rectangle%201384.svg");
                        set_one_checked($(event.target), false);
                        let quntity = how_many_checked();
                        if (quntity.num > 0) {
                            update_down_bar()
                        } else {
                            close_down_bar();
                            all_checks.attr("src", "../assets/Rectangle%201384.svg");
                        }
                    } else {
                        change_attribute($(event.target), "src", "../assets/check.svg");
                        set_one_checked($(event.target), true);
                        let quntity = how_many_checked();
                        update_down_bar()
                        if (quntity.num === quntity.all) {
                            all_checks.attr("src", "../assets/check.svg");
                        }
                    }

                }
            });

            function how_many_checked () {
                let num = 0,
                    list = JSON.parse(localStorage.getItem(wh_name)),
                    all = list.length,
                    obj = {};
                list.forEach(it => {
                   if (it.checked === true) {
                       num++
                   }
                });
                obj = {num, all}
                // console.log(list)
                return obj;
            }

            function start_down_bar () {
                warehouse_page.css("height", "88%");
                body.append(down_bar());
                down_bar_logic();
            }

            function close_down_bar () {
                warehouse_page.css("height", "100%");
                $("#down_bar").remove();
            }

            function update_down_bar () {
                close_down_bar();
                start_down_bar();
            }

            function down_bar () {
                return `
                    <div class="down_bar" id="down_bar">
                        <div class="down_bar_content">
                            <div class="information">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14.2857 0H1.71428C0.767511 0 0 0.767511 0 1.71428V14.2857C0 15.2325 0.767511 16 1.71428 16H14.2857C15.2325 16 16 15.2325 16 14.2857V1.71428C16 0.767511 15.2325 0 14.2857 0ZM5.14285 12.5714H3.42857C3.11297 12.5714 2.85713 12.3156 2.85713 12C2.85713 11.6844 3.11297 11.4286 3.42857 11.4286H5.14285C5.45846 11.4286 5.71429 11.6844 5.71429 12C5.71429 12.3156 5.45846 12.5714 5.14285 12.5714ZM5.14285 8.57142H3.42857C3.11297 8.57142 2.85713 8.31559 2.85713 7.99998C2.85713 7.68438 3.11297 7.42854 3.42857 7.42854H5.14285C5.45846 7.42854 5.71429 7.68438 5.71429 7.99998C5.71429 8.31559 5.45846 8.57142 5.14285 8.57142ZM5.14285 4.57141H3.42857C3.11297 4.57141 2.85713 4.31558 2.85713 3.99997C2.85713 3.68437 3.11297 3.42857 3.42857 3.42857H5.14285C5.45846 3.42857 5.71429 3.68441 5.71429 4.00001C5.71429 4.31561 5.45846 4.57141 5.14285 4.57141ZM12.5714 12.5714H7.42858C7.11298 12.5714 6.85714 12.3156 6.85714 12C6.85714 11.6844 7.11298 11.4286 7.42858 11.4286H12.5714C12.887 11.4286 13.1429 11.6844 13.1429 12C13.1429 12.3156 12.887 12.5714 12.5714 12.5714ZM12.5714 8.57142H7.42858C7.11298 8.57142 6.85714 8.31559 6.85714 7.99998C6.85714 7.68438 7.11298 7.42854 7.42858 7.42854H12.5714C12.887 7.42854 13.1429 7.68438 13.1429 7.99998C13.1429 8.31559 12.887 8.57142 12.5714 8.57142ZM12.5714 4.57141H7.42858C7.11298 4.57141 6.85714 4.31558 6.85714 3.99997C6.85714 3.68437 7.11298 3.42854 7.42858 3.42854H12.5714C12.887 3.42854 13.1429 3.68437 13.1429 3.99997C13.1429 4.31558 12.887 4.57141 12.5714 4.57141Z" fill="#3E4C59"/>
                                </svg>
                                <div class="selected">Selected:</div>
                                <div class="selected" id="selected"></div>
                            </div>
                        <div class="buttons">
                            <button class="delete_button" id="delete_button">Delete</button>
                            <button class="common_button move_button" id="move_button">
                                Move&nbsp;&nbsp;&nbsp;&nbsp;
                                <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 2.5L13 2.5M1 2.5L2.71875 1M1 2.5L2.71875 4" stroke="white" stroke-width="1.2" stroke-linecap="round"/>
                                    <path d="M13 7.5L1 7.5M13 7.5L11.2812 6M13 7.5L11.2812 9" stroke="white" stroke-width="1.2" stroke-linecap="round"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                `
            }

            function set_all_checked (list, state) {
                // console.log("here", state);
                list.forEach(obj => {
                    obj.checked = state;
                });
                return list;
            }

            function set_one_checked (item, state) {
                let obj = item.parent().parent(),
                    name_of_product = $(obj.children()[1]).text();
                let list_of_all = JSON.parse(localStorage.getItem(wh_name));
                list_of_all.forEach(it => {
                    if (it.name === name_of_product) {
                        it.checked = state;
                        // console.log(it)
                    }
                })
                localStorage.setItem(wh_name, JSON.stringify(list_of_all));
            }

            function change_attribute (obj, attribute, value) {
                obj.attr(attribute, value);
            }

            warehouses_button.click(function () {
                close_down_bar();
                location.reload();
            });

            function left_bar_extra_options (button) {
                button.click(function () {
                    close_down_bar();
                })
            }

            left_bar_extra_options(home_button);
            left_bar_extra_options(accounts_button);
            left_bar_extra_options(cards_button);
            left_bar_extra_options(contacts_button);
            left_bar_extra_options(chat_button);

            products_sort.selectmenu();

            steps_cargo_adding.tabs({
                disabled: [1,2]
            });

            adding_cargo_button.click(() => {
                adding_cargo_form.dialog("open");
            });

            adding_cargo_form.dialog({
                autoOpen: false,
                width: 624,
                height: 806,
                modal: true,
                draggable: false,
                resizable: false,
                close: function() {
                    get_to_next_step(0, 1, "Adding a product");
                    steps_cargo_adding.tabs("disable", 2);
                    clear_buttons(all_shipment_btns);
                    set_what_way(false,false,false);
                    set_what_way_to_pay(false,false, false);
                    clear_buttons(all_payment_btns);
                    input_item_number.val('');
                    input_manufacturer.val('');
                    input_product_name.val('');
                    $('input[name="purchase_tech"][value="A"]').prop("checked", true);
                }
            });

            finish_adding_cargo.dialog({
                autoOpen: false,
                width: 622,
                height: 638,
                modal: true,
                draggable: false,
                resizable: false,
                close: function() {}
            })

            first_step_btn.click((event) => {
                event.preventDefault();
                if (check_product_data(input_product_name, input_manufacturer, input_item_number)) {
                    let one_product = {};
                    one_product.name = input_product_name.val();
                    one_product.man = input_manufacturer.val();
                    one_product.num = input_item_number.val();
                    one_product.checked = false;
                    one_product.purch = $('input[name="purchase_tech"]:checked').val();
                    // console.log(wh_name, one_product);
                    localStorage.setItem("one product"+" "+wh_name, JSON.stringify(one_product));
                    get_to_next_step(1, 0, "Shipping method");
                }
            });

            second_step_btn.click((event) => {
                event.preventDefault();
                try {
                    let one_product = JSON.parse(localStorage.getItem("one product"+" "+wh_name));
                    if (what_way.plane || what_way.sea || what_way.car) {
                        if (what_way.plane) {
                            one_product.ship = "plane"
                        }
                        if (what_way.sea) {
                            one_product.ship = "sea"
                        }
                        if (what_way.car) {
                            one_product.ship = "car"
                        }
                        // console.log(wh_name, one_product);
                        localStorage.setItem("one product"+" "+wh_name, JSON.stringify(one_product));
                        get_to_next_step(2, 1, "Payment method");
                    }
                } catch (e) {
                    console.log(e)
                }
            });

            third_step_btn.click((event) => {
               event.preventDefault();
               if (what_way_to_pay.cash || what_way_to_pay.card || what_way_to_pay.paypal) {
                   let one_product = JSON.parse(localStorage.getItem("one product"+" "+wh_name));
                   delete_table();
                   update_product_storage(one_product);
                   create_product_table(wh_name);
                   // console.log(wh_name, one_product);
                   finish_adding_cargo.dialog("open");
                   adding_cargo_form.dialog("close");
               }
            });

            finish_adding_cargo_btn.click((event) =>{
                event.preventDefault();
                localStorage.removeItem("one product"+" "+wh_name);
                finish_adding_cargo.dialog("close");
                close_down_bar();
            });

            function get_to_next_step (turn_on, turn_off, title) {
                steps_cargo_adding.tabs("enable", turn_on);
                steps_cargo_adding.tabs("option", "active", turn_on);
                steps_cargo_adding.tabs("disable", turn_off);
                form_header.text(title);
            }

             function check_numeric (object) {
                if (object.val().length) {
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

            const check_length = (object, min) => {
                if (object.val().length < min) {
                    object.addClass("ui-state-error");
                    return false
                } else {
                    return true
                }
            }

            function check_product_data (name, man, num) {
                let valid = true;
                all_fields.removeClass("ui-state-error");
                valid = check_length(name, 5) && valid;
                valid = check_length(man, 2) && valid;
                valid = check_numeric(num) && valid;
                valid = $('input[name="purchase_tech"]').is(':checked') && valid;
                return valid;
            }

            shipment_by_plane_btn.click(function (event) {
                event.preventDefault();
                clear_buttons(all_shipment_btns);
                color_buttons($(this));
                set_what_way(true, false, false);
            });

            shipment_by_sea_btn.click(function (event) {
                event.preventDefault();
                clear_buttons(all_shipment_btns);
                color_buttons($(this));
                set_what_way(false, true, false);
            });

            shipment_by_car_btn.click(function (event) {
                event.preventDefault();
                clear_buttons(all_shipment_btns);
                color_buttons($(this));
                set_what_way(false, false, true);
            });

            payment_by_card_btn.click(function (event) {
                event.preventDefault();
                clear_buttons(all_payment_btns);
                color_buttons($(this));
                set_what_way_to_pay(true, false, false);
            });

            payment_by_paypal.click(function (event) {
                event.preventDefault();
                clear_buttons(all_payment_btns);
                color_buttons($(this));
                set_what_way_to_pay(false, true, false);
            });

            payment_in_cash_btn.click(function (event) {
                event.preventDefault();
                clear_buttons(all_payment_btns);
                color_buttons($(this));
                set_what_way_to_pay(false, false, true);
            });

            function color_buttons (obj) {
                let svg = $(obj.children("svg"));
                let rect = $(obj.children().children("rect"));
                let path = $(obj.children().children("path"));
                let g_path = $(obj.children().children("g").children("path"));
                let circle = makeSVG("path", {class: "circle", d: "M270 18C263.383 18 258 23.3829 258 30C258 36.6171 263.383 42 270 42C276.617 42 282 36.6171 282 30C282 23.3829 276.617 18 270 18Z", fill: "#EE950F"})
                let note = makeSVG("path", {class: "note", d: "M276.082 27.4565L269.581 33.9564C269.386 34.1514 269.13 34.2496 268.875 34.2496C268.619 34.2496 268.363 34.1514 268.168 33.9564L264.918 30.7065C264.526 30.3156 264.526 29.6835 264.918 29.2925C265.309 28.9014 265.94 28.9014 266.332 29.2925L268.875 31.8355L274.668 26.0426C275.059 25.6515 275.69 25.6515 276.082 26.0426C276.472 26.4335 276.472 27.0654 276.082 27.4565Z", fill: "#FAFAFA"})
                rect.addClass("choosing_bg");
                path.addClass("choosing_type");
                g_path.addClass("choosing_type");
                $(svg).append(circle);
                $(svg).append(note);

                function makeSVG(tag, attrs) {
                    var el= document.createElementNS('http://www.w3.org/2000/svg', tag);
                    for (var k in attrs)
                        el.setAttribute(k, attrs[k]);
                    return el;
                }
            }

            function clear_buttons (all_buttons) {
                all_buttons.each(function (i) {
                    const btn = $(this);
                    let note = $(btn).children().children(".note"),
                        circle = $(btn).children().children(".circle"),
                        rect = $(btn).children().children("rect"),
                        path = $(btn).children().children("path"),
                        g_path = $(btn).children().children("g").children("path");

                    note.remove();
                    circle.remove();
                    rect.removeClass("choosing_bg");
                    path.removeClass("choosing_type");
                    g_path.removeClass("choosing_type");
                });
            }

            function set_what_way_to_pay (card, paypal, cash) {
                what_way_to_pay.card = card;
                what_way_to_pay.paypal = paypal;
                what_way_to_pay.cash = cash;
            }

            function set_what_way (plane, sea, car) {
                what_way.plane = plane;
                what_way.sea = sea;
                what_way.car = car;
            }

            function create_product_table (storage_token) {
                try {
                    let current_list = JSON.parse(localStorage.getItem(storage_token));
                    current_list.forEach(item => {
                        draw_product_table(item);
                    });
                } catch (e) {
                    console.log(e);
                }
            }

            function update_product_storage (item) {
                if (JSON.parse(localStorage.getItem(wh_name)) !== null) {
                    let current_list = JSON.parse(localStorage.getItem(wh_name));
                    let updated_list = add_new_product(
                        current_list,
                        item.name,
                        item.man,
                        item.num,
                        item.purch,
                        item.ship);
                    localStorage.setItem(wh_name, JSON.stringify(updated_list));
                } else {
                    let list_of_products = [];
                    let new_list = add_new_product(
                        list_of_products,
                        item.name,
                        item.man,
                        item.num,
                        item.purch,
                        item.ship);
                    localStorage.setItem(wh_name, JSON.stringify(new_list));
                }
            }

            function add_new_product (list, name, manufacturer, number, purch_tech, shipment) {
                let current_product = {
                    name,
                    man: manufacturer,
                    num: number,
                    purch: purch_tech,
                    ship: shipment
                }
                list.push(current_product);
                return list;
            }

            const create_product_table_line = (name, man, num, purch, ship) => {
                let shipment_type = " - ";
                switch (ship) {
                    case 'plane':
                        shipment_type = plane_shipment();
                        break;
                    case 'sea':
                        shipment_type = sea_shipment();
                        break;
                    case 'car':
                        shipment_type = car_shipment();
                        break;
                }
                return (`<tr class="table_line">
                        <td><img class="check" id="${name.replace(/[.*+?^${}()|[\]\\]/g, "").replace(/ /g, '')}" src="../assets/Rectangle%201384.svg" alt="square"></td>
                        <td>${name}</td>
                        <td>${man}</td>
                        <td>${num}</td>
                        <td>${purch}</td>
                        <td>${shipment_type}</td>
                    </tr>`);
            }

            function plane_shipment () {
                return `
                    <svg width="52" height="24" viewBox="0 0 52 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.15008 16.6532L5.21325 15.5861L5.41597 15.3834L7.13525 15.6178L7.38099 15.6513L7.55637 15.476L10.6676 12.3647L11.1504 11.8819L10.5444 11.5673L5.27028 8.83013L5.72427 8.37615L12.7501 9.95336L13.0186 10.0136L13.2132 9.81906L16.3245 6.7078C16.6032 6.4291 17.0396 6.43295 17.3032 6.69664C17.5669 6.96032 17.5708 7.39673 17.2921 7.67542L14.1808 10.7867L13.9862 10.9813L14.0465 11.2498L15.6238 18.2756L15.1698 18.7296L12.4326 13.4555L12.1181 12.8494L11.6352 13.3323L8.52396 16.4435L8.34859 16.6189L8.3821 16.8647L8.61655 18.5839L8.41383 18.7867L7.34673 16.8499L7.27687 16.7231L7.15008 16.6532Z" fill="#3E4C59" stroke="#3E4C59"/>
                        <path d="M33.696 16L34.4972 13.6903H37.9062L38.7031 16H40.1009L36.9602 7.27273H35.4389L32.2983 16H33.696ZM34.8807 12.5824L36.1676 8.85795H36.2358L37.5227 12.5824H34.8807ZM42.6779 7.27273H41.3612V16H42.6779V7.27273ZM44.5955 16H45.9123V12.6974H47.7021C47.7319 12.6974 47.7575 12.6974 47.7873 12.6974L49.56 16H51.06L49.1254 12.4673C50.195 12.071 50.7276 11.1804 50.7276 10.0085C50.7276 8.40199 49.7305 7.27273 47.7063 7.27273H44.5955V16ZM45.9123 11.5639V8.40199H47.5657C48.8654 8.40199 49.4023 9.01989 49.4023 10.0085C49.4023 10.9929 48.8654 11.5639 47.5827 11.5639H45.9123Z" fill="#3E4C59"/>
                    </svg>
                `
            }

            function sea_shipment () {
                return `
                        <svg width="56" height="24" viewBox="0 0 56 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.4134 5.81001C13.4134 5.36337 13.0501 5 12.6034 5H11.3947C10.9481 5 10.5847 5.36337 10.5847 5.81001V7.02101H13.4134V5.81001Z" fill="#3E4C59"/>
                            <path d="M12.1155 10.0693L16.8107 11.2961V8.26843C16.8107 8.09901 16.6729 7.96118 16.5035 7.96118H7.49035C7.32093 7.96118 7.18311 8.09901 7.18311 8.26843V11.2961L11.8783 10.0693C11.9561 10.049 12.0378 10.049 12.1155 10.0693Z" fill="#3E4C59"/>
                            <path d="M19.5394 18.0551C19.0215 18.0551 18.7879 17.9388 18.4921 17.7915C18.3532 17.7223 18.2068 17.6494 18.0321 17.5873C17.7895 17.5011 17.4922 17.4357 17.0848 17.43L18.8028 13.1052C18.8408 13.0025 18.8104 12.917 18.7887 12.875C18.7669 12.8326 18.7142 12.7574 18.6069 12.7293L12.0005 11.0032L5.39416 12.7293C5.28674 12.7574 5.23409 12.8326 5.21229 12.875C5.19061 12.917 5.16017 13.0026 5.19831 13.1053L6.91245 17.43C6.50522 17.4362 6.20823 17.502 5.9658 17.5885C5.79253 17.6504 5.64704 17.7228 5.50906 17.7915C5.21323 17.9388 4.97959 18.0552 4.46166 18.0552C4.20252 18.0552 3.99243 18.2652 3.99243 18.5244C3.99243 18.7835 4.20252 18.9936 4.46166 18.9936C5.20028 18.9936 5.58654 18.8013 5.92732 18.6316C6.06012 18.5655 6.18052 18.5058 6.31956 18.4598C6.49033 18.4034 6.68925 18.368 6.97473 18.368C7.03989 18.368 7.10051 18.3698 7.15738 18.3734C7.5524 18.3978 7.76352 18.5029 8.02213 18.6316C8.36291 18.8013 8.74918 18.9936 9.4878 18.9936C10.2264 18.9936 10.6126 18.8013 10.9534 18.6316C11.2492 18.4844 11.4829 18.368 12.0007 18.368C12.5186 18.368 12.7522 18.4843 13.048 18.6316C13.3888 18.8013 13.775 18.9936 14.5136 18.9936C15.2522 18.9936 15.6385 18.8013 15.9792 18.6316C16.2387 18.5025 16.4503 18.3972 16.8477 18.3732C16.9035 18.3698 16.9628 18.368 17.0265 18.368C17.3089 18.368 17.5065 18.4028 17.676 18.4581C17.8174 18.5042 17.9393 18.5647 18.0738 18.6316C18.4146 18.8013 18.8008 18.9936 19.5394 18.9936C19.7986 18.9936 20.0087 18.7835 20.0087 18.5244C20.0087 18.2653 19.7985 18.0551 19.5394 18.0551ZM7.66245 13.4045L11.8819 12.302C11.9596 12.2817 12.0413 12.2817 12.1191 12.302L16.3385 13.4045C16.5893 13.47 16.7394 13.7264 16.6739 13.9771C16.6188 14.1881 16.4285 14.3278 16.2203 14.3278C16.181 14.3278 16.1411 14.3228 16.1013 14.3125L12.0005 13.241L7.89969 14.3125C7.64897 14.378 7.39259 14.2278 7.32708 13.9771C7.26158 13.7264 7.41173 13.47 7.66245 13.4045Z" fill="#3E4C59"/>
                            <path d="M37.7188 9.56534H38.9886C38.9503 8.16761 37.7145 7.15341 35.9418 7.15341C34.1903 7.15341 32.848 8.15483 32.848 9.65909C32.848 10.8736 33.7173 11.5852 35.1193 11.9645L36.1506 12.2457C37.0838 12.4929 37.804 12.7997 37.804 13.5753C37.804 14.4276 36.9901 14.9901 35.8693 14.9901C34.8551 14.9901 34.0114 14.5384 33.9347 13.5881H32.6136C32.6989 15.169 33.9219 16.1449 35.8778 16.1449C37.9276 16.1449 39.108 15.0668 39.108 13.5881C39.108 12.0156 37.706 11.4062 36.598 11.1335L35.7457 10.9119C35.0639 10.7372 34.1562 10.4176 34.1605 9.58239C34.1605 8.84091 34.8381 8.29119 35.9119 8.29119C36.9134 8.29119 37.625 8.75994 37.7188 9.56534ZM40.6815 16H46.2042V14.8665H41.9982V12.1946H45.8675V11.0653H41.9982V8.40625H46.1531V7.27273H40.6815V16ZM48.6491 16L49.4503 13.6903H52.8594L53.6562 16H55.054L51.9134 7.27273H50.392L47.2514 16H48.6491ZM49.8338 12.5824L51.1207 8.85795H51.1889L52.4759 12.5824H49.8338Z" fill="#3E4C59"/>
                        </svg>
                `
            }

            function car_shipment () {
                return `
                    <svg width="74" height="24" viewBox="0 0 74 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.3321 17.3316V14.741C18.3321 14.1844 17.8897 13.7331 17.3441 13.7331H17.0859V4.27533C17.0859 4.19073 17.0442 4.11178 16.9751 4.06514L16.348 3.64228C16.1838 3.53157 15.9648 3.65167 15.9648 3.85248V6.88999L15.778 6.37572C15.5266 5.68406 14.88 5.22503 14.1569 5.22503H9.8393C9.11197 5.22503 8.46244 5.68939 8.21421 6.38684L8.03513 6.88999V3.85248C8.03513 3.6517 7.81618 3.53157 7.65196 3.64228L7.02484 4.06511C6.95566 4.11175 6.91403 4.1907 6.91403 4.27531V13.7331H6.65579C6.11018 13.7331 5.66786 14.1844 5.66786 14.741V17.3316H5.24696C5.11057 17.3316 5 17.4444 5 17.5836V18.9765C5 19.1157 5.11057 19.2285 5.24696 19.2285H6.31247V19.8962C6.31247 20.1745 6.53363 20.4001 6.80645 20.4001H8.1154C8.38822 20.4001 8.60938 20.1745 8.60938 19.8962V19.2285H15.3906V19.8962C15.3906 20.1745 15.6118 20.4001 15.8846 20.4001H17.1935C17.4664 20.4001 17.6875 20.1745 17.6875 19.8962V19.2285H18.753C18.8894 19.2285 19 19.1157 19 18.9765V17.5836C19 17.4444 18.8894 17.3316 18.753 17.3316L18.3321 17.3316ZM8.36236 8.29353H15.6376V10.7762H8.36236V8.29353ZM8.19319 16.6265H7.34943C7.09163 16.6265 6.88263 16.4133 6.88263 16.1503V16.1382C6.88263 15.8752 7.09163 15.662 7.34943 15.662H8.19317C8.45097 15.662 8.65997 15.8752 8.65997 16.1382V16.1503C8.66 16.4133 8.451 16.6265 8.19319 16.6265ZM13.679 16.7669H10.321C10.0481 16.7669 9.82698 16.5413 9.82698 16.263V13.07C9.82698 12.7917 10.0481 12.5661 10.321 12.5661H13.679C13.9518 12.5661 14.1729 12.7918 14.1729 13.07V16.263C14.173 16.5413 13.9518 16.7669 13.679 16.7669ZM16.6505 16.6265H15.8068C15.549 16.6265 15.3399 16.4133 15.3399 16.1503V16.1382C15.3399 15.8752 15.549 15.662 15.8068 15.662H16.6505C16.9083 15.662 17.1173 15.8752 17.1173 16.1382V16.1503C17.1173 16.4133 16.9083 16.6265 16.6505 16.6265ZM13.6039 14.4103H10.3881C10.2531 14.4103 10.1436 14.2987 10.1436 14.1609V14.1558C10.1436 14.018 10.2531 13.9064 10.3881 13.9064H13.6039C13.7389 13.9064 13.8484 14.018 13.8484 14.1558V14.1609C13.8484 14.2987 13.7389 14.4103 13.6039 14.4103ZM13.6039 13.4024H10.3881C10.2531 13.4024 10.1436 13.2908 10.1436 13.153V13.1479C10.1436 13.0102 10.2531 12.8985 10.3881 12.8985H13.6039C13.7389 12.8985 13.8484 13.0102 13.8484 13.1479V13.153C13.8484 13.2908 13.7389 13.4024 13.6039 13.4024ZM13.6039 16.4261H10.3881C10.2531 16.4261 10.1436 16.3144 10.1436 16.1766V16.1716C10.1436 16.0338 10.2531 15.9221 10.3881 15.9221H13.6039C13.7389 15.9221 13.8484 16.0338 13.8484 16.1716V16.1766C13.8484 16.3144 13.7389 16.4261 13.6039 16.4261ZM13.6039 15.4182H10.3881C10.2531 15.4182 10.1436 15.3065 10.1436 15.1688V15.1637C10.1436 15.026 10.2531 14.9143 10.3881 14.9143H13.6039C13.7389 14.9143 13.8484 15.026 13.8484 15.1637V15.1688C13.8484 15.3065 13.7389 15.4182 13.6039 15.4182Z" fill="#3E4C59"/>
                        <path d="M32.5284 8.40625H35.2472V16H36.5597V8.40625H39.2827V7.27273H32.5284V8.40625ZM40.7752 16H42.092V12.6974H43.8817C43.9116 12.6974 43.9371 12.6974 43.967 12.6974L45.7397 16H47.2397L45.305 12.4673C46.3746 12.071 46.9073 11.1804 46.9073 10.0085C46.9073 8.40199 45.9102 7.27273 43.886 7.27273H40.7752V16ZM42.092 11.5639V8.40199H43.7454C45.0451 8.40199 45.582 9.01989 45.582 10.0085C45.582 10.9929 45.0451 11.5639 43.7624 11.5639H42.092ZM54.1218 7.27273V12.9062C54.1218 14.0909 53.3036 14.9432 51.9741 14.9432C50.6488 14.9432 49.8263 14.0909 49.8263 12.9062V7.27273H48.5096V13.0128C48.5096 14.8452 49.8817 16.1449 51.9741 16.1449C54.0664 16.1449 55.4428 14.8452 55.4428 13.0128V7.27273H54.1218ZM64.6058 10.1108C64.3075 8.24432 62.8459 7.15341 61.0007 7.15341C58.7422 7.15341 57.076 8.84517 57.076 11.6364C57.076 14.4276 58.7337 16.1193 61.0007 16.1193C62.9183 16.1193 64.3203 14.9176 64.6058 13.1918L63.2763 13.1875C63.0504 14.304 62.1129 14.9176 61.0092 14.9176C59.5135 14.9176 58.3842 13.7713 58.3842 11.6364C58.3842 9.51847 59.5092 8.35511 61.0135 8.35511C62.1257 8.35511 63.0589 8.98153 63.2763 10.1108H64.6058ZM66.1815 16H67.4982V13.2855L68.5295 12.1009L71.3505 16H72.9357L69.4031 11.2017L72.9229 7.27273H71.2653L67.6048 11.4403H67.4982V7.27273H66.1815V16Z" fill="#3E4C59"/>
                    </svg>
                `
            }

            const draw_product_table = (pr_item) => {
                product_table.append(create_product_table_line(pr_item.name, pr_item.man, pr_item.num, pr_item.purch, pr_item.ship));
            }

            function delete_table () {
                let table_lines = $(".table_line");
                table_lines.remove();
            }

            // update_product_storage({
            //     name: "name",
            //     man: "man",
            //     num: "num",
            //     purch: "purch",
            //     ship: "shipment",
            // });
            close_down_bar();
            localStorage.setItem(wh_name, JSON.stringify(set_all_checked(JSON.parse(localStorage.getItem(wh_name)), false)))
            create_product_table(wh_name);

            // ------------------------ Down bar logic ------------------------------
            function down_bar_logic () {
                const selected = $("#selected"),
                    move_btn = $("#move_button"),
                    moving_steps = $("#moving_steps"),
                    delete_button = $("#delete_button");

                moving_steps.tabs();

                moving_cargo.dialog({
                    autoOpen: false,
                    width: 624,
                    height: 710,
                    modal: true,
                    draggable: false,
                    resizable: false,
                    close: function() {}
                })

                function count_all_selected () {
                    let list_of_all = JSON.parse(localStorage.getItem(wh_name));
                    let selected_list = [];
                    list_of_all.forEach(item => {
                        if (item.checked === true) {
                            selected_list.push(item);
                        }
                    });
                    selected.text(selected_list.length);
                }

                delete_button.click(function () {
                    let list_of_items = JSON.parse(localStorage.getItem(wh_name));
                    const new_list_of_items = list_of_items.filter((item) => !item.checked)
                    localStorage.setItem(wh_name, JSON.stringify(new_list_of_items));
                    all_checks.attr("src", "../assets/Rectangle%201384.svg");
                    close_down_bar();
                    delete_table();
                    create_product_table(wh_name);
                })

                move_btn.click(function () {
                    moving_cargo.dialog("open")
                })
                count_all_selected();
            }
        }

        create_table(warehouse);
    }
})