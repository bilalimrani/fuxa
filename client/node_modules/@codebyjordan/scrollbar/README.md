# CbjScrollbar

This package allows you to easily create custom scrollbars with Angular 5. Currently tested on Chrome and Firefox
and running very well. [Demo/Docs](https://scrollbar.codebyjordan.com)

## Table of Contents
* [Install](#install)
* [Import](#import)
* [Usage](#usage)
    * [Main Scrollbar](#root)
    * [Cards](#cards)
* [Config](#config)
* [Defaults](#defaults)
* [Services](#services)


## <a name="install"></a>Install

```bash
npm i --save @codebyjordan/scrollbar
```

## <a name="import"></a> Import

```typescript
// app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CbjScrollbarModule } from '@codebyjordan/scrollbar';
 
@NgModule({
  imports: [
    BrowserModule,
    CbjScrollbarModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## <a name="usage"></a> Usage
Some examples to get started.

### <a name="root"></a> As the windows main scrollbar
Here I am going to override the browsers scrollbar and use this as the main windows scrollbar. I will be using a minimal 
setup for demonstration purposes, see the Configuration section for more options.  

#### app.component.ts
```typescript
import {Component, OnInit} from '@angular/core';
import {ScrollbarOptions, ScrollbarConfig} from '@codebyjordan/scrollbar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  mainScrollbar: ScrollbarConfig;

  ngOnInit() {
    this.mainScrollbar = new ScrollbarConfig({
      isRoot: true,
      alwaysVisible: true
    });
  }
}
```

#### app.component.html
```html
<div class="container-fluid wrapper">
     <div class="row">
         <nav class="navbar cbj-elevation-3 navbar-expand navbar-dark bg-primary w-100">
             <div class="collapse navbar-collapse">
                 <ul class="navbar-nav mr-auto">
                     <li class="nav-item">
                         <a routerLink="/home" routerLinkActive="active" class="nav-link">Home</a>
                     </li>
                     <li class="nav-item">
                         <a class="nav-link" routerLink="/getting-started" routerLinkActive="active">Getting Started</a>
                     </li>
                     <li class="nav-item">
                         <a class="nav-link" routerLink="/usage" routerLinkActive="active">Usage</a>
                     </li>
                 </ul>
             </div>
         </nav>
     </div>
 
     <div class="row">
         <div class="main-content" [cbjScrollbar]="mainScrollbar">
             <router-outlet></router-outlet>
         </div>
     </div>
 </div>
```

#### app.component.scss
```scss
$navbar-height: 3.25rem;

.main-content {
  height: calc(100vh - #{$navbar-height});
  width: 100%;
}
```

### <a name="cards"></a> Cards (multiple)
In this example I make three BS4 cards with a height of 350px and some Lipsum text. Each one has a slightly different 
configuration and look. 

#### card-demo.component.ts
```typescript
import {Component, OnInit} from '@angular/core';
import {ScrollbarOptions, ScrollbarConfig} from '@codebyjordan/scrollbar';

@Component({
  selector: 'app-card-demo',
  templateUrl: './card-demo.component.html',
  styleUrls: ['./card-demo.component.scss']
})
export class CardDemoComponent implements OnInit {
  firstCardScroll: ScrollbarConfig;
  secondCardScroll: ScrollbarConfig;
  thirdCardScroll: ScrollbarConfig;

  ngOnInit(): void {
      this.firstCardScroll = new ScrollbarConfig({
        styles: {
          grid: {
            'border-top-right-radius': '.25rem',
            'border-bottom-right-radius': '.25rem',
            'opacity': '.75',
            'background': '#1F2421',
          },
          bar: {
            'background': '#216869'
          },
        },
        alwaysVisible: true
      });
  
      this.secondCardScroll = new ScrollbarConfig({styles: {bar: {'background': '#2274A5'}}});
  
      this.thirdCardScroll = new ScrollbarConfig({
        styles: {
          bar: {
            'opacity': '.65',
            'background': '#1F2421'
          }
        },
        alwaysVisible: true
      });
    }
}

```

#### card-demo.component.html
```html
<div class="container py-4">
    <div class="row">
        <div class="col">
            <div class="card scroll-card">
                <div class="card-body" [cbjScrollbar]="firstCardScroll">
                    ...
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col">
            <div class="card mt-4 scroll-card bg-secondary text-white">
                <div class="card-body" [cbjScrollbar]="secondCardScroll">
                    ...
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col">
            <div class="card mt-4 scroll-card bg-primary text-white">
                <div class="card-body" [cbjScrollbar]="thirdCardScroll">
                    ...
                </div>
            </div>
        </div>
    </div>
</div>
```

#### card-demo.component.scss
```scss
.scroll-card {
  height: 350px;
  padding: 0 1.5rem;
  border: none;
  overflow: hidden;
}
```

## <a name="config"></a> Configuration
You must pass an instance of ScrollbarConfig to the directive for it to function. However, how much you configure is up to
you. It is possible to go with no configuration at all and only pass `{}` to the ScrollbarConfig constructor.

### ScrollbarConfig
The ScrollbarConfig constructor takes a single argument using the ScrollbarOptions interface. Use this interface to 
configure the scrollbar. The available options are:
```typescript
export interface ScrollbarOptions {
  isRoot?: boolean;
  position?: string;
  alwaysVisible?: boolean;
  visibleTimeout?: number;
  gridOffset?: string | number;
  barOffset?: string | number;
  toggleClasses?: Subject<{ el: string, classes: string, remove: boolean }>;
  styles?: ScrollbarStyles;
  classes?: ScrollbarClasses;
}

export interface ScrollbarStyles {
  wrapper?: { [prop: string]: string | number };
  grid?: { [prop: string]: string | number };
  bar?: { [prop: string]: string | number };
}

export interface ScrollbarClasses {
  wrapper?: string;
  grid?: string;
  bar?: string;
}
```
#### isRoot
* **Type:** boolean
* **Default:** false

Flag to set when the scrollbar is used as the main windows scrollbar
Setting isRoot to true does the following things:  
* Prevents the main window from scrolling if an inner window is scrolling.
* Creates an observable that broadcasts the current scroll position on scroll.
* Sets the scroll position and height on the ScrollbarService
* If the RouterModule is present it will listen for Route changes and scroll to top on route change

#### position
* **Type:** `string`
* **Default:** `'right'`

The position of the scrollbar. Valid options are 'right' and 'left'.

#### alwaysVisible
* **Type:** `boolean`
* **Default:** `false`

Boolean setting whether the scrollbar hides after a timeout.

#### visibleTimeout
* **Type:** `number`
* **Default:** `3000`

The timeout in milliseconds for hiding the scrollbar.

#### barOffset
* **Type:** `number | string`
* **Default:** `'.5rem''`

The bars offset. Must be a valid css value for the left or right property.

#### gridOffset
* **Type:** `number | string`
* **Default:** `0`

The grids offset. Must be a valid css value for the left or right property.

#### toggleClasses
* **Type:** `Subject<{ el: string, classes: string, remove: boolean }>`
* **Default:** `undefined`

A Subject that can be used to toggle classes on the wrapper, grid, or bar elements. 

#### styles
* **Type:** `ScrollbarStyles`
* **Default:** `See Below`

The ScrollbarStyles interface has a key for each the wrapper, grid, and bar element, each of which takes an object with
valid css properties as keys with either string or number values.

#### classes
* **Type:** `ScrollbarClasses`
* **Default:** `See Below`

The ScrollbarClasses interface has a key for each the wrapper, grid, and bar element that accept a string of class(es) to
be applied to the element.

## <a name="defaults"></a> Defaults
```typescript
export const DEFAULT_SCROLLBAR: ScrollbarOptions = {
  isRoot: false,
  position: 'right',
  alwaysVisible: false,
  visibleTimeout: 3000,
  gridOffset: 0,
  barOffset: '.5rem',
  styles: {
    wrapper: {
      'width': '100%',
      'overflow': 'hidden',
      'display': 'flex'
    },
    grid: {
      'position': 'absolute',
      'top': 0,
      'bottom': 0,
      'display': 'block',
      'cursor': 'pointer',
      'z-index': 99999,
      'background': 'transparent',
      'width': '1rem',
      'border-radius': 0,
      'margin': 0,
      'transition': 'opacity 250ms ease-in-out'
    },
    bar: {
      'position': 'absolute',
      'top': 0,
      'display': 'block',
      'cursor': 'pointer',
      'transition': 'opacity 250ms ease-in-out',
      'z-index': 100000,
      'background': '#495057',
      'width': '.7rem',
      'border-radius': '10px',
      'margin': 0
    }
  },
  classes: {
    wrapper: 'cbj-scroll-wrapper',
    grid: 'cbj-scroll-grid',
    bar: 'cbj-scroll-bar'
  }
};
```

## <a name="services"></a> Services
The package provides 2 services and an Injectable token.

### ScrollbarService
The scrollbar service provides a convenient way of interacting with the scrollbar and, mainly, getting information about
like scroll position, scroll height, and an elements distance from the top or bottom. Internally, the service is used by the
directive to create Observables for responding to the mouse wheel and drag events. 

#### Properties
The ScrollbarService properties

##### scrollObs
* **Type:** `Observable<number>`

Observable of the scroll event. Broadcasts current scroll position on update.

##### scrollPos
* **Type:** `number`

The current scroll position.

##### scrollHeight
* **Type:** `number`

The scrollHeight of the root scrollbars element or document.documentElement.scrollHeight if no root scrollbar.

##### childScrolling
* **Type:** `boolean`

Boolean indicating whether a non root scrollbar is currently scrolling.

#### Methods
ScrollbarService Methods

#### getOffsetTop(el): number
Returns the passed elements offset top value

#### getOffsetBottom(el): number
Returns the passed elements offset bottom value

### WindowService

#### Properties
The WindowService properties

##### window
* **Type:** `Window`

The browsers Window object

##### resizeObs
* **Type:** `Observable<any>`

Observable of the window resize event.

##### isMobile
* **Type:** `number`

Boolean indicating if on mobile sized display.

##### width
* **Type:** `number`

The width of the browsers window.


##### height
* **Type:** `number`

The height of the viewport. If a scrollbar has been created with isRoot set to true, this will be the height of the 
host element, otherwiseit is the window.innerHeight property 