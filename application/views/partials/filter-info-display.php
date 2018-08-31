<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * Author: Hariharan Arunachalam
 * Date: Jul 26, 2016 (10:13:41 PM)
 * Explicit author permission required before this code is reused for any purpose - more like please let me know :)
 */
?>
<span>Selected</span>
<span class="bold" data-bind="text: temporalGroupNames[SelectedTemporalGroupType()]"></span>
<span>data</span>
<!-- ko if: SelectedTemporalSelectionType() === 'range'  -->
<span> from </span>
<span class="bold" data-bind="text: SelectedRangeStart"></span>
<span> to </span>
<span class="bold" data-bind="text: SelectedRangeEnd"></span>
<span> [</span><span class="bold" data-bind="text: SelectedTemporalEndIndex() - SelectedTemporalStartIndex() + 1"></span>
<span class="bold" data-bind="text: SelectedTemporalGroupType() + 's'"></span><span>] </span>
<!-- /ko -->
<!-- ko if: SelectedTemporalSelectionType() === 'single' -->
<span>on</span>
<span class="bold" data-bind="text: SelectedSinglePoint"></span>
<!-- /ko -->
<!-- ko if: SelectedUnrestCategories().length > 0 -->
, for <span data-bind="text: SelectedUnrestCategories().length"> </span> categories
<!-- /ko -->
<!-- ko if: SelectedActors().length > 0 -->
, involving <span data-bind="text: ActorsInvolvedDisplay "> </span>
<!-- /ko -->
<span>(</span><span class="bold"  data-bind="text: numeral(FilteredCount()).format('0,0')">                                        
</span> <span>points)</span>
                                    