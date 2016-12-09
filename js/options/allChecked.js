export default function allCheckedMaster() {
  let allChecked = true;
  $("tbody input[type='checkbox']").each(function() {
    if ( !$(this).is(":checked") && allChecked ) {
      allChecked = false;
    }
  });

  $("input#row-master").prop("checked", allChecked);
}
