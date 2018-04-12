<div class="icons-grid-module <?php echo $settings->color_style; ?>">
    <div class="icons-grid-module__wrap">
        <h4 class="icons-grid-module__heading text-center"><?php echo $settings->heading_field; ?></h4>
        <div class="row icons-grid-module__row">            
            
            <?php for ( $i = 0; $i < count( $settings->items ); 
            $i++ ) : if ( ! is_object( $settings->items[ $i ] ) ) { continue; } ?>

            <?php 
                // Column Classes
                $columns = $settings->columns;

                switch ($columns) {
                    case 6:
                        $colClass = 'col-sm-2 icons-grid-module__col icons-grid-module__col--lg';
                        break;
                    case 3:
                        $colClass = 'col-sm-4 icons-grid-module__col icons-grid-module__col--md';
                        break;
                    case 2:
                        $colClass = 'col-sm-6 icons-grid-module__col icons-grid-module__col--sm';
                        break;
                    default:
                        $colClass = 'col-sm-4 icons-grid-module__col icons-grid-module__col--md';
                        break;
                }
            ?>
            <div class="<?php echo $colClass; ?>" 
                 data-toggle="tooltip" 
                 data-placement="bottom" 
                 title="">
                <?php if($settings->items[ $i ]->icon_select) : ?>
                <div class="icons-grid-module__icon">
                    <svg viewBox="0 0 100 100"><use xlink:href="#<?php echo $settings->items[ $i ]->icon_select; ?>"></use></svg>
                </div>
                <?php endif; ?>

                <?php if($settings->items[ $i ]->item_title) : ?>
                <div class="icons-grid-module__title">
                    <?php echo($settings->items[ $i ]->item_title); ?>
                </div>
                <?php endif; ?>
            </div>

            <?php endfor; ?>
        </div>

        <?php if($settings->notes_field) : ?>
        <div class="row icons-grid-module__notes">
            <div class="col"><?php echo($settings->notes_field); ?></div>
        </div>
        <?php endif; ?>
    </div>
</div>