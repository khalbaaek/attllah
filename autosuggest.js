
    let suggestions = [];

    // Fetch the suggestions with URLs from the JSON file
    jQuery.getJSON('../cron/search.json?v=1.15', function(data) {
        suggestions = data;
    });

    // jQuery UI autocomplete for the input field
    jQuery("#search-field").autocomplete({
        source: function(request, response) {
            const filteredSuggestions = suggestions.filter(function(item) {
                return item.title.toLowerCase().includes(request.term.toLowerCase());
            }).slice(0, 10);  // Limit results to 10
            response(filteredSuggestions);
        },
        minLength: 2,
        appendTo: "#resultDiv", // Ensure that the menu gets appended to the custom div
        focus: function(event, ui) {
            event.preventDefault();  // Prevent input field from being populated when using keyboard navigation
        },
        select: function(event, ui) {
            event.preventDefault(); // Prevent closing dropdown on item selection
            return false;  // Prevent the default behavior of closing the autocomplete
        },
        close: function(event, ui) {
            // Override the close method to prevent closing on clicks
            event.preventDefault(); // Block default close behavior
        }
    })
    .autocomplete("instance")._renderItem = function(ul, item) {
        const term = jQuery("#search-field").val().toLowerCase();
        const highlightedItem = highlightTerm(item.title, term);

        // Render each item as a clickable link
        // return jQuery("<li>")
        //     .append(`<a href="${item.url}" target="_blank"><div class="search-result-thumb me-2"><img src="${item.banner}" width="40" height="40" /></div>${highlightedItem}</a>`)
        //     .appendTo(ul);

            // Render each item with highlighted text and append it to the ul
        const $li = jQuery("<li>").append('<a href="'+item.url+'"><div class="d-flex"><div class="search-result-thumb min-w-50px" style="min-width:40px"><img src="'+item.banner+'" width="40" height="40" /></div><div>'+highlightedItem+'</div></div></a>');
         // Attach event handler to prevent autocomplete from closing when the link is clicked
         $li.find("a").on("mousedown", function(event) {
            event.preventDefault();  // Prevent mousedown event from closing the autocomplete
        });

        // Prevent closing of the dropdown when link is clicked
        $li.find("a").on("click", function(event) {
            event.preventDefault();    // Prevent the default link behavior
            event.stopImmediatePropagation(); // Stop the menu from closing
            window.open(item.url, '_parent'); // Optionally open the link in a new tab
        });

        return $li.appendTo(ul);
    };

    // Override the _renderMenu method to append to a specific div
    jQuery("#search-field").autocomplete("instance")._renderMenu = function(ul, items) {
        const $resultDiv = jQuery("#resultDiv");
        ul.empty();
        $resultDiv.empty(); // Clear previous results
        jQuery.each(items, (index, item) => {
            this._renderItemData(ul, item);
        });
        $resultDiv.append(ul); // Append the ul to the specified div
    };

    // Function to highlight matching term in the suggestions
    function highlightTerm(text, term) {
        const regex = new RegExp("(" + jQuery.ui.autocomplete.escapeRegex(term) + ")", "gi");
        return text.replace(regex, "<span class='highlight'>$1</span>");
    }
