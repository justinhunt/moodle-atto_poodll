<?php
// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * Atto text editor integration version file.
 *
 * @package    atto_poodll
 * @copyright  2013 Justin Hunt <poodllsupport@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

require_once($CFG->dirroot . '/filter/poodll/poodllresourcelib.php');

/**
 * Initialise this plugin
 * @param string $elementid
 */
function atto_poodll_strings_for_js() {
    global $PAGE;

    $PAGE->requires->strings_for_js(array('createpoodll',
                                          'unpoodll',
                                          'enterurl',
                                          'insert',
                                          'cancel',
                                          'dialogtitle',
                                          'browserepositories',
                                          'openinnewwindow'),
                                    'atto_poodll');
}

/**
 * Return the js params required for this module.
 * @return array of additional params to pass to javascript init function for this module.
 */
function atto_poodll_params_for_js($elementid, $options, $fpoptions) {
	global $USER;

	//contextid
	$usercontextid=context_user::instance($USER->id)->id;
	//config our array of data
	$params = array();
	$params['usercontextid'] = $usercontextid;

    return $params;
}

