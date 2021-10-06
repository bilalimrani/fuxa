import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Options } from 'ng5-slider';

import { GaugeRangeProperty } from '../../../_models/hmi';
import { DevicesUtils, Tag } from '../../../_models/device';
import { Utils } from '../../../_helpers/utils';
import { FlexVariableComponent } from '../flex-variable/flex-variable.component';

@Component({
    selector: 'flex-input',
    templateUrl: './flex-input.component.html',
    styleUrls: ['./flex-input.component.css']
})
export class FlexInputComponent implements OnInit {
    @Input() data: any;
    @Input() ranges: GaugeRangeProperty[];
    @Input() type: string;
    @Input() inputType: string;
    @Input() default: any;
    @ViewChild('unit') varunit: FlexVariableComponent;
    @ViewChild('digits') vardigits: FlexVariableComponent;


    tag: Tag = null;
    withLabel = true;
    withValue = true;
    slideView = true;
    defaultColor = Utils.defaultColor;
    options: Options = {
        floor: 0,
        ceil: 100
    };
    valueresult = '123';

    constructor() {
    }

    ngOnInit() {
        if (!this.ranges) {
            this.ranges = [];
            let ip: GaugeRangeProperty = new GaugeRangeProperty();
            if (this.isWithStep()) {
                ip.type = this.type;
                ip.min = 1;
                ip.max = 1;
            } else if (this.isMinMax()) {
                ip.type = this.type;
                ip.min = 0;
                ip.max = 100;
                ip.style = [true, true];
            } else {
                ip.type = this.type;
                ip.min = 20;
                ip.max = 80;
            }
            this.addInput(ip);
        } else if (this.isMinMax()) {
            if (this.ranges.length > 0 && this.ranges[0].style.length === 2) {
                this.withLabel = this.ranges[0].style[0];
                this.withValue = this.ranges[0].style[1];
            }
        } else if (this.isWithUnit()) {

        }
        this.ranges.forEach(range => {
            if (!range.color) {
                range.color = '';
            }
            if (!range.stroke) {
                range.stroke = '';
            }
        });
    }

    onAddInput() {
        let gap: GaugeRangeProperty = new GaugeRangeProperty();
        gap.type = this.type;
        gap.color = '';
        gap.stroke = '';
        this.addInput(gap);
    }

    onRemoveInput(index: number) {
        this.ranges.splice(index, 1);
    }

    onRangeViewToggle(slideView) {
        this.slideView = slideView;
    }

    getRanges() {
        let result = [];
        this.ranges.forEach(element => {
            element.type = this.inputType;
            if (this.isWithStep()) {
                element.max = element.min;
                if (element.min !== null && element.max !== null) {
                    result.push(element);
                }
            } else if (this.isMinMax()) {
                element.style = [this.withLabel, this.withValue];
                result.push(element);
            } else {
                if (!Utils.isNullOrUndefined(element.min) && !Utils.isNullOrUndefined(element.max)) {
                    result.push(element);
                }
            }
        });
        return result;
    }

    getColor(item) {
        if (item && item.color) {
            return item.color;
        } else if (this.default && this.default.color) {
            return this.default.color;
        }
    }

    changeTag(_tag) {
        this.tag = _tag;
        if (this.tag) {
            const newOptions: Options = Object.assign({}, this.options);
            for (let i = 0; i < this.ranges.length; i++) {
                if (!this.ranges[i].min || this.ranges[i].min <= newOptions.floor) {
                    this.ranges[i].min = newOptions.floor;
                }
                if (!this.ranges[i].max || this.ranges[i].max >= newOptions.ceil) {
                    this.ranges[i].max = newOptions.ceil;
                }
            }
        }
        if (this.isWithUnit()) {
            let device = DevicesUtils.getDeviceFromTagId(this.data.devices, _tag.id);
            if (device) {
                if (this.varunit) {
                    this.varunit.setVariable(DevicesUtils.getTagFromTagAddress(device, _tag.address + 'OpcEngUnit'));
                }
                if (this.vardigits) {
                    this.vardigits.setVariable(DevicesUtils.getTagFromTagAddress(device, _tag.address + 'DecimalPlaces'));
                }
            }
        }
    }

    isWithRange() {
        if (this.inputType === 'range') {
            return true;
        }
        return false;
    }

    isMinMax() {
        if (this.inputType === 'minmax') {
            return true;
        }
        return false;
    }

    isWithRangeColor() {
        if (this.inputType === 'range') {
            return true;
        }
        return false;
    }

    isWithStep() {
        if (this.inputType === 'step') {
            return true;
        }
        return false;
    }

    isWithUnit() {
        if (this.inputType === 'unit') {
            return true;
        }
        return false;
    }

    onFormatDigitChanged(range: GaugeRangeProperty, event) {
        range['fractionDigitsId'] = event.variableId;
        range['fractionDigits'] = event.variableValue;
    }

    onUnitChanged(range: GaugeRangeProperty, event) {
        range.textId = event.variableId;
        range.text = event.variableValue;
    }

    private addInput(gap: GaugeRangeProperty) {
        this.ranges.push(gap);
    }
}

export enum InputItemType {
    Color,
}
