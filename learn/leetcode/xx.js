/*
 * function ListNode(x){
 *   this.val = x;
 *   this.next = null;
 * }
 */

/**
 * 
 * @param head ListNode类 
 * @return void
 */
function reorderList( head ) {
    if (!head) return null;
    let dumy = {
        next: head
    };
    let quick = dumy, slow = dumy;
    while (quick && quick.next) {
        slow = slow.next;
        quick = quick.next.next
    }
    let mid = reverseList(slow.next);
    slow.next = null;
    while (head && mid) {
        let next = head.next;
        head.next = mid;
        mid = mid.next;
        head.next.next = next;
        head = next;
    }
    return dumy.next;
}

function reverseList(head) {
    const dumy = {
        next: null,
    };
    while(head) {
        const dumyNext = dumy && dumy.next;
        const headNext = head.next;
        dumy.next = head;
        head.next = dumyNext;
        head = headNext;
    }
    return dumy.next;
}
reorderList(
{
    val: 1,
    next:  { val: 2, next:  { val: 3, next: {
        val: 4
    } } }
  }
)